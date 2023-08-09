-- Deploy PH:fn_check_parking_space_availability to pg
-- requires: table_parking_space_availability

BEGIN;

DROP FUNCTION IF EXISTS util.check_parking_space_availability(payload util.check_parking_space_availability_input);
DROP TYPE IF EXISTS util.check_parking_space_availability_input;

CREATE TYPE util.check_parking_space_availability_input AS (
  parking_space_ids        UUID[]
  , start_date    TIMESTAMPTZ
  , end_date      TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION util.check_parking_space_availability(payload util.check_parking_space_availability_input)
  RETURNS TABLE (
    id UUID[]
  )
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _request_start_date TIMESTAMPTZ DEFAULT payload.start_date;
  _request_end_date   TIMESTAMPTZ DEFAULT payload.end_date;
  _parking_space_ids   UUID[] DEFAULT payload.parking_space_ids;
BEGIN

  RETURN QUERY
  WITH requested_parking_spaces AS (
    SELECT
      series.start_date::DATE AS booking_date
      , series.end_date
      FROM (
        SELECT
          generate_series(_request_start_date, _request_end_date) AS start_date
      ) AS series
  )
  , count_requested_parking_space AS (
    SELECT
      COUNT(rt.start_date) AS count_parking_space
      FROM requested_parking_spaces AS rt
  )
  , requested_days AS (
    SELECT
        rt.booking_date
      FROM requested_parking_spaces AS rt
      GROUP BY rt.booking_date
      ORDER by rt.booking_date ASC
  )
  , parking_space_hours AS (
    SELECT
      psa.parking_space_id
      , rd.booking_date
      , psa.start_hour
      , psa.end_hour
      , ps.working_hours AS working_hours
    FROM requested_days AS rd
    LEFT JOIN api.parking_space_availability AS psa ON rd.booking_date = psa.from_date
    LEFT JOIN api.parking_space AS ps ON psa.parking_space_id = ps.id
    WHERE psa.parking_space_id = ANY (_parking_space_ids)
  )
  , parking_space_timetable AS (
    SELECT
      series.parking_space_id
      , series.start_date
      , (series.end_date) AS end_date
      , series.booking_date
      FROM (
        SELECT
          generate_series((psh.booking_date + psh.start_hour)::TIMESTAMP AT TIME ZONE psh.working_hours, (psh.booking_date + sh.end_hour)::TIMESTAMP AT TIME ZONE psh.working_hours) AS start_date
          , psh.booking_date
          , psh.slot_id
          FROM parking_space_hours AS psh
      ) AS series
      WHERE series.start_date::TIMESTAMPTZ >= _request_start_date
        AND (series.start_date)::TIMESTAMPTZ <=  _request_end_date
  )
  SELECT
    ARRAY_AGG(sub.parking_id)
    FROM (
      SELECT
        pst.parking_space_id
      FROM parking_space_timetable AS pst
         , count_requested_parking_space AS crt
      WHERE EXISTS (
        SELECT 1
        FROM requested_parking_spaces AS rt
        WHERE rt.start_date = pst.start_date
          AND rt.end_date = pst.end_date
      )
      GROUP BY pst.slot_id, crt.count_parking_space
      HAVING COUNT(pst.start_date) = crt.count_parking_space
         AND MIN(pst.start_date) = _request_start_date
         AND MAX(pst.end_date) = _request_end_date
    ) AS sub;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION util.check_parking_space_availability(util.check_parking_space_availability_input) FROM public;

COMMENT ON FUNCTION util.check_parking_space_availability(util.check_parking_space_availability_input) IS 'Add function to check availability for certain parking space ids and start/end date';

COMMIT;

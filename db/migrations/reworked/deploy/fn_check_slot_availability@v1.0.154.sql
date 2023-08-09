-- Deploy PH:fn_check_slot_availability to pg
-- requires: table_slot_booking

BEGIN;

DROP FUNCTION util.check_slot_availability(payload util.check_slot_availability_input);
DROP TYPE IF EXISTS util.check_slot_availability_input;

CREATE TYPE util.check_slot_availability_input AS (
  slot_ids        UUID[]
  , start_time    TIMESTAMPTZ
  , end_time      TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION util.check_slot_availability(payload util.check_slot_availability_input)
  RETURNS TABLE (
    id UUID[]
  )
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _request_start_time TIMESTAMPTZ DEFAULT payload.start_time;
  _request_end_time   TIMESTAMPTZ DEFAULT payload.end_time;
  _slot_ids           UUID[] DEFAULT payload.slot_ids;
  _timeslot_interval  INTERVAL DEFAULT '5 minutes';
BEGIN

  RETURN QUERY
  WITH requested_timeslots AS (
    SELECT
      series.start_time::DATE AS booking_date
      , EXTRACT(DOW FROM series.start_time) AS day_of_week
      , series.start_time
      , (series.start_time + _timeslot_interval) AS end_time
      FROM (
        SELECT
          generate_series(_request_start_time, _request_end_time - _timeslot_interval, _timeslot_interval) AS start_time
      ) AS series
  )
  , count_requested_timeslots AS (
    SELECT
      COUNT(rt.start_time) AS count_timeslots
      FROM requested_timeslots AS rt
  )
  , requested_days AS (
    SELECT
        rt.booking_date
        , rt.day_of_week
      FROM requested_timeslots AS rt
      GROUP BY rt.booking_date, rt.day_of_week
      ORDER by rt.booking_date ASC
  )
  , slot_hours AS (
    SELECT
      sa.slot_id
      , rd.booking_date
      , rd.day_of_week
      , sa.start_hour
      , sa.end_hour
      , sl.timezone AS slot_timezone
    FROM requested_days AS rd
    LEFT JOIN api.slot_availability AS sa ON rd.day_of_week = sa.day_of_week
    LEFT JOIN api.slot AS sl ON sa.slot_id = sl.id
    WHERE sa.slot_id = ANY (_slot_ids)
  )
  , slot_timetable AS (
    SELECT
      series.slot_id
      , series.start_time
      , (series.start_time + _timeslot_interval) AS end_time
      , series.booking_date
      , series.day_of_week
      FROM (
        SELECT
          generate_series((sh.booking_date + sh.start_hour)::TIMESTAMPTZ, (sh.booking_date + sh.end_hour - _timeslot_interval)::TIMESTAMPTZ, _timeslot_interval) AS start_time
          , sh.booking_date
          , sh.day_of_week
          , sh.slot_id
          FROM slot_hours AS sh
      ) AS series
      WHERE series.start_time::TIMESTAMPTZ >= _request_start_time
        AND (series.start_time + _timeslot_interval)::TIMESTAMPTZ <=  _request_end_time
  )
  SELECT
    ARRAY_AGG(sub.slot_id)
    FROM (
      SELECT
        st.slot_id
      FROM slot_timetable AS st
         , count_requested_timeslots AS crt
      WHERE EXISTS (
        SELECT 1
        FROM requested_timeslots AS rt
        WHERE rt.start_time = st.start_time
          AND rt.end_time = st.end_time
      )
      GROUP BY st.slot_id, crt.count_timeslots
      HAVING COUNT(st.start_time) = crt.count_timeslots
         AND MIN(st.start_time) = _request_start_time
         AND MAX(st.end_time) = _request_end_time
    ) AS sub;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION util.check_slot_availability(util.check_slot_availability_input) FROM public;

COMMENT ON FUNCTION util.check_slot_availability(util.check_slot_availability_input) IS 'Add function to check availability for certain slot ids and start/end time';

COMMIT;

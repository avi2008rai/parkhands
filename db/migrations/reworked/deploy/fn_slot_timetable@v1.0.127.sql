-- Deploy PH:fn_slot_timetable to pg
-- requires: table_slot
-- requires: table_slot_availability

BEGIN;

CREATE OR REPLACE FUNCTION api.slot_timetable( slot_ids UUID[]
                                             , timetable_start_time TIMESTAMPTZ DEFAULT (NOW()::DATE + '00:00'::TIME)
                                             , timetable_end_time TIMESTAMPTZ DEFAULT (NOW()::DATE + '24:00'::TIME))
  RETURNS TABLE(
    slot_id           UUID
    , start_time      TIMESTAMPTZ
    , end_time        TIMESTAMPTZ
    , timetable_date    DATE
    , day_of_week     INTEGER
    , booked          BOOLEAN
  )
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _timetable_start_time TIMESTAMPTZ DEFAULT timetable_start_time;
  _timetable_end_time   TIMESTAMPTZ DEFAULT timetable_end_time;
  _timeslot_interval    INTERVAL DEFAULT '5 minutes';
BEGIN

  IF start_time > end_time THEN
    RAISE EXCEPTION 'Start time cannot be after end time!' USING ERRCODE = 'SL400';
  END IF;

  RETURN QUERY
  WITH requested_timeslots AS (
    SELECT
      series.start_time::DATE AS timetable_date
      , EXTRACT(DOW FROM series.start_time) AS day_of_week
      , series.start_time
      , (series.start_time + _timeslot_interval) AS end_time
      FROM (
        SELECT
          generate_series(_timetable_start_time, _timetable_end_time - _timeslot_interval, _timeslot_interval) AS start_time
      ) AS series
  )
  , requested_days AS (
    SELECT
        rt.timetable_date
        , rt.day_of_week
      FROM requested_timeslots AS rt
      GROUP BY rt.timetable_date, rt.day_of_week
      ORDER by rt.timetable_date ASC
  )
  , slot_hours AS (
    SELECT
      sa.slot_id
      , rd.timetable_date
      , rd.day_of_week
      , sa.start_hour
      , sa.end_hour
      , sl.timezone AS slot_timezone
    FROM requested_days AS rd
    LEFT JOIN api.slot_availability AS sa ON rd.day_of_week = sa.day_of_week
    LEFT JOIN api.slot AS sl ON sa.slot_id = sl.id
    WHERE sa.slot_id = ANY (slot_ids)
  )
  , slot_timetable AS (
    SELECT
      series.slot_id
      , series.start_time
      , (series.start_time + _timeslot_interval) AS end_time
      , series.timetable_date
      , series.day_of_week
      FROM (
        SELECT
          generate_series((sh.timetable_date + sh.start_hour)::TIMESTAMP AT TIME ZONE sh.slot_timezone, (sh.timetable_date + sh.end_hour - _timeslot_interval)::TIMESTAMP AT TIME ZONE sh.slot_timezone, _timeslot_interval) AS start_time
          , sh.timetable_date
          , sh.day_of_week
          , sh.slot_id
          FROM slot_hours AS sh
      ) AS series
      WHERE series.start_time::TIMESTAMPTZ >= _timetable_start_time
        AND (series.start_time + _timeslot_interval)::TIMESTAMPTZ <=  _timetable_end_time
      ORDER BY series.start_time
  )
  , slot_booked_timeslots AS (
    SELECT
      DISTINCT st.start_time AS slot_start_time, st.end_time AS slot_end_time
      , sb.id AS slot_booking_id
      , sb.slot_id
    FROM slot_timetable AS st
    JOIN timescale.slot_booking AS sb ON (((st.start_time, st.end_time) OVERLAPS (sb.start_time, sb.end_time)))
    WHERE sb.slot_id = st.slot_id
      AND sb.status != 'canceled'::booking_status_t
    ORDER BY st.start_time, st.end_time
  )
  SELECT
    st.slot_id
    , st.start_time
    , st.end_time
    , st.timetable_date
    , st.day_of_week::INTEGER
    , (
      SELECT
        COUNT(sbt.slot_booking_id) > 0 AS booked
      FROM slot_booked_timeslots AS sbt
      WHERE st.start_time = sbt.slot_start_time
      AND st.end_time = sbt.slot_end_time
      AND st.slot_id = sbt.slot_id
    ) AS booked
  FROM
    slot_timetable AS st;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ) FROM public;

COMMENT ON FUNCTION api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ) IS 'display timetable based on opening hours for multiple slots';

-- set grants
GRANT EXECUTE ON FUNCTION api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.slot_timetable(UUID[], TIMESTAMPTZ, TIMESTAMPTZ) TO base_single;

COMMIT;

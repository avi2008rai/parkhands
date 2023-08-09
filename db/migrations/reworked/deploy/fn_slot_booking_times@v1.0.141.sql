-- Deploy PH:fn_slot_booking_times to pg
-- requires: table_slot_booking

BEGIN;

CREATE TYPE api.slot_booking_times_input AS (
  slot_ids        UUID[]
  , start_time    TIMESTAMPTZ
  , end_time      TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION api.slot_booking_times(payload api.slot_booking_times_input)
  RETURNS TABLE(
    slot_id           UUID
    , start_time      TIMESTAMPTZ
    , end_time        TIMESTAMPTZ
  )
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
BEGIN

  RETURN QUERY
    SELECT
      sb.slot_id
      , sb.start_time
      , sb.end_time
      FROM timescale.slot_booking AS sb
      LEFT JOIN api.slot AS s ON sb.slot_id = s.id
      WHERE sb.slot_id = ANY( payload.slot_ids )
        AND (sb.start_time, sb.end_time) OVERLAPS (payload.start_time, payload.end_time)
        AND sb.status != 'canceled'::booking_status_t
        AND s.status = 'enabled'::slot_status_t
        AND NOT s.deleted
      ORDER BY sb.slot_id, sb.start_time ASC;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.slot_booking_times(api.slot_booking_times_input) FROM public;

COMMENT ON FUNCTION api.slot_booking_times(api.slot_booking_times_input) IS 'fetch limited data from slot_booking table';

-- set grants
GRANT EXECUTE ON FUNCTION api.slot_booking_times(api.slot_booking_times_input) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.slot_booking_times(api.slot_booking_times_input) TO base_single;

COMMIT;

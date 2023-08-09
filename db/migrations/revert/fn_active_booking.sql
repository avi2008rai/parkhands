-- Deploy PH:fn_active_booking to pg
-- requires: view_slot_booking
-- requires: type_booking_status_t

BEGIN;

  DROP FUNCTION api.active_booking(payload api.active_booking_input);
  DROP TYPE api.active_booking_input;

  CREATE TYPE api.active_booking_input as (
    start_time    TIMESTAMPTZ
    , interval    INTERVAL
  );

  CREATE OR REPLACE FUNCTION api.active_booking(payload api.active_booking_input)
    RETURNS api.slot_bookings
    LANGUAGE PLPGSQL STABLE
    SET search_path TO PUBLIC, api
  AS $fn_block$
  DECLARE
    _user_id        UUID DEFAULT request.user_id();
    _start_time     TIMESTAMPTZ DEFAULT COALESCE(payload.start_time, NOW());
    _interval       INTERVAL DEFAULT payload.interval;
    _booking        api.slot_bookings%ROWTYPE;
  BEGIN

    IF _interval IS NULL THEN
      RAISE EXCEPTION 'invalid_interval' USING ERRCODE = 'AB001';
    END IF;

      SELECT INTO _booking
        sb.*
      FROM api.slot_bookings AS sb
      LEFT JOIN api.slot AS s ON s.id = sb.slot_id
      WHERE sb.user_id = _user_id
        AND sb.status != 'canceled'::booking_status_t
        AND tstzrange(sb.start_time, sb.end_time)
         && tstzrange(_start_time::TIMESTAMP AT TIME ZONE s.timezone, (_start_time + _interval)::TIMESTAMP AT TIME ZONE s.timezone)
      ORDER BY sb.start_time ASC
      LIMIT 1;

    RETURN _booking;

  END $fn_block$;

COMMENT ON FUNCTION api.active_booking(payload api.active_booking_input) IS 'Returns ongoing and upcoming bookings';

REVOKE ALL PRIVILEGES ON FUNCTION api.active_booking(payload api.active_booking_input) FROM public;

GRANT EXECUTE ON FUNCTION api.active_booking(payload api.active_booking_input) TO base_single;

COMMIT;

-- Deploy PH:fn_active_booking to pg
-- requires: view_slot_booking
-- requires: type_booking_status_t

BEGIN;

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
  _user_id      UUID DEFAULT request.user_id();
  _start_time   TIMESTAMPTZ DEFAULT payload.start_time;
  _interval     INTERVAL DEFAULT payload.interval;
  _booking      api.slot_bookings%ROWTYPE;
BEGIN

  IF _start_time IS NULL THEN
    _start_time := NOW();
  END IF;

  IF _interval IS NULL THEN
    RAISE EXCEPTION 'invalid_interval' USING ERRCODE = 'AB001';
  END IF;

  SELECT * INTO _booking
    FROM api.slot_bookings AS sb
  WHERE
    sb.user_id = _user_id
    AND sb.status != 'canceled'::booking_status_t
    AND sb.end_time > _start_time
    AND (
        sb.start_time < _start_time
      OR
        sb.start_time BETWEEN _start_time AND _start_time + _interval
    )
  LIMIT 1;

  RETURN _booking;

END $fn_block$;

COMMENT ON FUNCTION api.active_booking(payload api.active_booking_input) IS 'Returns ongoing and upcoming bookings';

REVOKE ALL PRIVILEGES ON FUNCTION api.active_booking(payload api.active_booking_input) FROM public;

GRANT EXECUTE ON FUNCTION api.active_booking(payload api.active_booking_input) TO base_single;

COMMIT;

-- Deploy PH:fn_slot_booking_attend to pg

BEGIN;

CREATE TYPE public.slot_attendance AS
  ENUM (
    'checkin'
    , 'checkout'
  );

CREATE TYPE api.slot_booking_attendance_input as (
  slot_booking_id       UUID
  , attendance_type     slot_attendance
  , time                TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION api.slot_booking_attend(payload api.slot_booking_attendance_input)
  RETURNS api.slot_bookings
  LANGUAGE PLPGSQL
  SECURITY DEFINER
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _booking          timescale.slot_booking%ROWTYPE;
  _user_id          UUID DEFAULT request.user_id();
  _slot_booking_id  UUID DEFAULT payload.slot_booking_id;
  _attendance_type  slot_attendance DEFAULT payload.attendance_type;
  _time             TIMESTAMPTZ DEFAULT payload.time;
BEGIN

  PERFORM public.session_check();

  IF _attendance_type IS NULL THEN
    RAISE EXCEPTION 'attend_type_not_set' USING ERRCODE = 'PV001';
  END IF;

  IF _time IS NULL THEN
    RAISE EXCEPTION 'attend_time_not_set' USING ERRCODE = 'PV002';
  END IF;

  SELECT INTO _booking sb.*
  FROM api.slot_bookings sb
  WHERE sb.id = _slot_booking_id
    AND sb.user_id = _user_id;

  IF _booking.id IS NULL THEN
    RAISE EXCEPTION 'booking_not_found' USING ERRCODE = 'BN001';
  END IF;

  IF _booking.status = 'canceled'::booking_status_t THEN
    RAISE EXCEPTION 'booking_canceled' USING ERRCODE = 'BC002';
  END IF;

  IF _time < _booking.start_time THEN
    RAISE EXCEPTION 'attend_before_booking_start' USING ERRCODE = 'AV001';
  END IF;

  IF _attendance_type = 'checkin'::slot_attendance AND _time > _booking.end_time THEN
    RAISE EXCEPTION 'checkin_after_booking_end' USING ERRCODE = 'AV002';
  END IF;

  IF _attendance_type = 'checkout'::slot_attendance AND _booking.check_in_at IS NULL THEN
    RAISE EXCEPTION 'checkout_without_checkin' USING ERRCODE = 'AV003';
  END IF;

  UPDATE timescale.slot_booking sb
    SET
    check_in_at = CASE
      WHEN _attendance_type = 'checkin'::slot_attendance THEN _time
      ELSE check_in_at -- Keep the checkin time on checkout
    END
    , check_out_at = CASE
      WHEN _attendance_type = 'checkout'::slot_attendance THEN _time
      ELSE null -- Reset checkout time on check-in
    END
  WHERE sb.id = _booking.id
  RETURNING * INTO _booking;

  RETURN _booking;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.slot_booking_attend(payload api.slot_booking_attendance_input) FROM public;

-- set grants
GRANT EXECUTE ON FUNCTION api.slot_booking_attend(payload api.slot_booking_attendance_input) TO base_single;

COMMIT;

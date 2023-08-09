-- Deploy PH:fn_slot_booking_status to pg
-- requires: schema_api

BEGIN;

DROP FUNCTION api.slot_booking_status(payload api.slot_booking_status_input);
DROP TYPE api.slot_booking_status_input;
DROP TYPE public.slot_availability_booking_status;

CREATE TYPE public.slot_availability_booking_status AS
  ENUM (
    'available'
    , 'booked'
    , 'unavailable'
  );

CREATE TYPE api.slot_booking_status_input AS (
  slot_id         UUID
  , start_time    TIMESTAMPTZ
  , end_time      TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION api.slot_booking_status(payload api.slot_booking_status_input)
  RETURNS public.slot_availability_booking_status
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _slot               api.slot;
  _slot_id            UUID DEFAULT payload.slot_id;
  _start_time         TIMESTAMPTZ DEFAULT payload.start_time;
  _end_time           TIMESTAMPTZ DEFAULT payload.end_time;
  _is_available       BOOLEAN DEFAULT FALSE;
  _is_bookable        BOOLEAN DEFAULT FALSE;
BEGIN

  IF _slot_id IS NULL
    OR _start_time IS NULL
    OR _end_time IS NULL
  THEN
    RAISE EXCEPTION 'missing_payload_params' USING ERRCODE = 'PP500';
  END IF;

  SELECT *
    INTO _slot
  FROM api.slot
    WHERE id = _slot_id;

  SELECT NOT count(*) = 0
    INTO _is_available
  FROM api.slot_availability api_sa
    WHERE api_sa.slot_id = _slot.id
    AND EXTRACT(DOW FROM _start_time::TIMESTAMPTZ AT TIME ZONE _slot.timezone) = api_sa.day_of_week
    AND (date(_start_time::TIMESTAMPTZ AT TIME ZONE _slot.timezone) + api_sa.start_hour::TIME)::TIMESTAMP AT TIME ZONE _slot.timezone <= _start_time
    AND (date(_end_time::TIMESTAMPTZ AT TIME ZONE _slot.timezone) + api_sa.end_hour::TIME)::TIMESTAMP AT TIME ZONE _slot.timezone >= _end_time;

  SELECT count(*) = 0
    INTO _is_bookable
  FROM timescale.slot_booking ts_sb
    WHERE ts_sb.slot_id = _slot.id
    AND ts_sb.status != 'canceled'
    AND (
      (ts_sb.start_time, ts_sb.end_time)
        OVERLAPS
      (_start_time, _end_time)
    );

  IF NOT _is_bookable THEN
    RETURN 'booked'::public.slot_availability_booking_status;
  END IF;

  IF NOT _is_available THEN
    RETURN 'unavailable'::public.slot_availability_booking_status;
  END IF;

  RETURN 'available'::public.slot_availability_booking_status;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.slot_booking_status(api.slot_booking_status_input) FROM public;

COMMENT ON FUNCTION api.slot_booking_status (api.slot_booking_status_input) IS 'fetch current booking status / note that this value changes depending on booking and working hours';

-- set grants
GRANT EXECUTE ON FUNCTION api.slot_booking_status(api.slot_booking_status_input) TO app_anonymous;
GRANT EXECUTE ON FUNCTION api.slot_booking_status(api.slot_booking_status_input) TO base_single;

COMMIT;

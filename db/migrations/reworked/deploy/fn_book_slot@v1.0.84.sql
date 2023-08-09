-- Deploy PH:fn_book_slot to pg
-- requires: table_slot_booking
-- requires: table_slot_availability

BEGIN;

CREATE TYPE api.book_slot_input as (
  user_id             UUID
  , slot_id           UUID
  , start_time        TIMESTAMPTZ
  , end_time          TIMESTAMPTZ
  , license_plate     CITEXT
);

CREATE OR REPLACE FUNCTION api.book_slot(payload api.book_slot_input)
  RETURNS api.slot_bookings
  LANGUAGE PLPGSQL
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  booking           timescale.slot_booking%ROWTYPE;
  _user_id          UUID DEFAULT request.user_id();
  _slot_id          UUID DEFAULT payload.slot_id;
  _start_time       TIMESTAMPTZ DEFAULT payload.start_time;
  _end_time         TIMESTAMPTZ DEFAULT payload.end_time;
  _license_plate    CITEXT DEFAULT payload.license_plate;
BEGIN

  PERFORM public.session_check();

  IF pg_catalog.pg_has_role(request.user_role(), 'app_super_admin', 'MEMBER')
    AND (payload.user_id)::UUID IS NOT NULL
  THEN
    _user_id := payload.user_id;
  END IF;

  PERFORM api.can_book_slot(row_to_json(payload));

  INSERT INTO timescale.slot_booking
    (slot_id, user_id, license_plate, start_time, end_time)
  VALUES
    (
      _slot_id
      , _user_id
      , _license_plate
      , _start_time
      , _end_time
    )
  RETURNING * INTO booking;

  RETURN booking;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.book_slot(payload api.book_slot_input) FROM public;

-- set grants
GRANT EXECUTE ON FUNCTION api.book_slot(payload api.book_slot_input) TO base_single;

COMMIT;

-- Deploy PH:fn_can_book_slot to pg
-- requires: table_slot_availability

BEGIN;

CREATE OR REPLACE FUNCTION api.can_book_slot(payload JSON)
  RETURNS VOID
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  _slot             api.slot;
  _slot_id          UUID DEFAULT payload->>'slot_id';
  _start_time       TIMESTAMPTZ DEFAULT payload->>'start_time';
  _end_time         TIMESTAMPTZ DEFAULT payload->>'end_time';
  -- reterned variable
  is_available      BOOLEAN DEFAULT FALSE;
  is_bookable       BOOLEAN DEFAULT FALSE;
BEGIN

  PERFORM public.session_check();

  SELECT *
    INTO _slot
    FROM api.slot
    WHERE id = (payload->>'slot_id')::UUID;

  IF _slot.status != 'enabled'::slot_status_t THEN
    RAISE EXCEPTION 'slot_unavailable_disabled' USING ERRCODE = 'SD409';
  END IF;

  SELECT INTO is_available
    CASE
      WHEN (cardinality(available_slot) > 0 AND _slot_id = ANY (available_slot)) THEN TRUE
      ELSE FALSE
    END
    FROM util.check_slot_availability((
      ARRAY[_slot_id]
      , _start_time
      , _end_time
    )::util.check_slot_availability_input) AS available_slot;

  IF NOT is_available THEN
    RAISE EXCEPTION 'slot_unavailable_outside_wh' USING ERRCODE = 'SU409';
  END IF;

  SELECT count(*) = 0
    INTO is_bookable
  FROM api.slot_bookings ts_sb
    WHERE ts_sb.slot_id = _slot_id
    AND ts_sb.status != 'canceled'
    AND (
      (ts_sb.start_time, ts_sb.end_time)
        OVERLAPS
      (_start_time, _end_time)
    );

  IF NOT is_bookable THEN
    RAISE EXCEPTION 'slot_unavailable_already_booked' USING ERRCODE = 'SB409';
  END IF;

  IF _start_time < now() THEN
    RAISE EXCEPTION 'slot_unavailable_back_in_time' USING ERRCODE = 'ST409';
  END IF;

END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.can_book_slot(payload JSON) FROM public;

-- set grants
GRANT EXECUTE ON FUNCTION api.can_book_slot(payload JSON) TO base_single;

COMMIT;

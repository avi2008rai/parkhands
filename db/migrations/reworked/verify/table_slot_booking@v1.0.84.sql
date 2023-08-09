-- Verify PH:table_slot_booking on pg

BEGIN;

  SELECT
    id
    , slot_id
    , user_id
    , license_plate
    , start_time
    , end_time
    , created_at
  FROM timescale.slot_booking
    WHERE FALSE;

ROLLBACK;

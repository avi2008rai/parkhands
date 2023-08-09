-- Verify PH:table_slot_booking on pg

BEGIN;

  SELECT
    id
    , slot_id
    , user_id
    , license_plate
    , phone
    , start_time
    , end_time
    , created_at
    , check_in_at
    , check_out_at
    , payment_receipt_id
  FROM timescale.slot_booking
    WHERE FALSE;

ROLLBACK;

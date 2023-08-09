-- Deploy PH:table_slot_booking to pg
-- requires: table_slot
-- requires: table_user

BEGIN;

  ALTER TABLE timescale.slot_booking DROP COLUMN payment_receipt_id;

COMMIT;

-- Deploy PH:table_slot_booking to pg
-- requires: table_slot
-- requires: table_user

BEGIN;

ALTER TABLE timescale.slot_booking ADD COLUMN phone phone_us;

COMMIT;

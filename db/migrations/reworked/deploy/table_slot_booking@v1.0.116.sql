-- Deploy PH:table_slot_booking to pg
-- requires: table_slot
-- requires: table_user

BEGIN;

ALTER TABLE timescale.slot_booking ADD COLUMN check_in_at TIMESTAMPTZ;
ALTER TABLE timescale.slot_booking ADD COLUMN check_out_at TIMESTAMPTZ;

COMMIT;

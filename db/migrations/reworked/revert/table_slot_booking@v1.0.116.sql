-- Deploy PH:table_slot_booking to pg
-- requires: table_slot
-- requires: table_user

BEGIN;

ALTER TABLE timescale.slot_booking DROP COLUMN check_in_at;
ALTER TABLE timescale.slot_booking DROP COLUMN check_out_at;

COMMIT;

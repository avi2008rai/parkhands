-- Revert PH:table_slot_booking from pg

BEGIN;

  DROP TABLE timescale.slot_booking;

COMMIT;

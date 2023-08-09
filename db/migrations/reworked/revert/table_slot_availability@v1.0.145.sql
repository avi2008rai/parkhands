-- Revert PH:table_slot_availability from pg

BEGIN;

  DROP TABLE api.slot_availability;

COMMIT;

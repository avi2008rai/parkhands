-- Revert PH:table_slot_amenity from pg

BEGIN;

  DROP TABLE api.slot_amenity;

COMMIT;

-- Revert PH:table_slot from pg

BEGIN;

  DROP TABLE api.slot;

COMMIT;

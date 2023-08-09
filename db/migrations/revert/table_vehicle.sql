-- Revert PH:table_vehicle from pg

BEGIN;

  DROP TABLE api.vehicle;

COMMIT;

-- Revert PH:table_vehicle_size from pg

BEGIN;

  DROP TABLE api.vehicle_size;

COMMIT;

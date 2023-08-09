-- Revert PH:table_vehicle_type from pg

BEGIN;

DROP TABLE api.vehicle_type;

COMMIT;

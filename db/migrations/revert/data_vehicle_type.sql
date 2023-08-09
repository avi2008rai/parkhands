-- Revert PH:data_vehicle_type to pg

BEGIN;

DELETE FROM api.vehicle_type;

COMMIT;

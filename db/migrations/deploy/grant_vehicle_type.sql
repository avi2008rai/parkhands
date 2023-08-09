-- Deploy PH:grant_vehicle_type to pg
-- requires: table_vehicle_type

BEGIN;

GRANT SELECT ON api.vehicle_type TO app_anonymous;
GRANT SELECT ON api.vehicle_type TO base_single;

GRANT SELECT ON api.vehicle_type TO base_super;
GRANT INSERT ON api.vehicle_type TO base_super;
GRANT UPDATE ON api.vehicle_type TO base_super;
GRANT DELETE ON api.vehicle_type TO base_super;

COMMIT;

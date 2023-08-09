-- Deploy PH:grants_vehicle_size to pg
-- requires: table_slot

BEGIN;

  GRANT SELECT ON api.vehicle_size TO app_anonymous;

  GRANT SELECT ON api.vehicle_size TO base_single;

  GRANT SELECT ON api.vehicle_size TO base_super;
  GRANT INSERT ON api.vehicle_size TO base_super;
  GRANT UPDATE ON api.vehicle_size TO base_super;
  GRANT DELETE ON api.vehicle_size TO base_super;

COMMIT;

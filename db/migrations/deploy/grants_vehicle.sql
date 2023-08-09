-- Deploy PH:grants_vehicle to pg
-- requires: table_vehicle

BEGIN;

  GRANT SELECT ON api.vehicle TO base_single;
  GRANT DELETE ON api.vehicle TO base_single;

  GRANT INSERT (
    name
    , owner_id
    , license_plate
    , vehicle_type_id
    , vehicle_size_id
    , status
  ) ON api.vehicle TO base_single;

  GRANT UPDATE (
    name
    , owner_id
    , license_plate
    , vehicle_type_id
    , vehicle_size_id
    , status
  ) ON api.vehicle TO base_single;

  GRANT SELECT ON api.vehicle TO base_super;
  GRANT INSERT ON api.vehicle TO base_super;
  GRANT UPDATE ON api.vehicle TO base_super;
  GRANT DELETE ON api.vehicle TO base_super;

COMMIT;

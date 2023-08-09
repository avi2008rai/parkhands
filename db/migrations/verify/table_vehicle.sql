-- Verify PH:table_vehicle on pg

BEGIN;

  SELECT
    id
    , owner_id
    , name
    , license_plate
    , vehicle_type_id
    , vehicle_size_id
    , status
    , created_at
    , updated_at
  FROM api.vehicle
    WHERE FALSE;

  SELECT
    1/COUNT(*)
  FROM pg_trigger
    WHERE tgname = 'trg_vehicle_set_updated_at';

ROLLBACK;

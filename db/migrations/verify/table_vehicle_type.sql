-- Verify PH:table_vehicle_type on pg

BEGIN;

SELECT
  id
  , name
  , weight
  FROM api.vehicle_type
  WHERE FALSE;

ROLLBACK;

-- Verify PH:data_vehicle_type on pg

BEGIN;

SELECT 1/( 4 = COUNT(*) )::INTEGER
  FROM api.vehicle_type;

ROLLBACK;

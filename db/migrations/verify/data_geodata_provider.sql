-- Verify PH:data_geodata_provider on pg

BEGIN;

SELECT 1/( 1 = COUNT(*) )::INTEGER
  FROM api.geodata_provider;

ROLLBACK;

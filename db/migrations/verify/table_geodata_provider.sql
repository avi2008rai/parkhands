-- Verify PH:table_geo_provider on pg

BEGIN;

SELECT
  id
  , name
  , status
  FROM api.geodata_provider
  WHERE FALSE;

ROLLBACK;

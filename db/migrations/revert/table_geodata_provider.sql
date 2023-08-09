-- Revert PH:table_geo_provider from pg

BEGIN;

DROP TABLE api.geodata_provider;

COMMIT;

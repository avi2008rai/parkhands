-- Revert PH:extension_postgis from pg

BEGIN;

DROP EXTENSION postgis;

COMMIT;

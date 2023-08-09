-- Revert PH:extension_hashids from pg

BEGIN;

DROP EXTENSION pg_hashids;

COMMIT;

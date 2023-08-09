-- Revert PH:extension_citext from pg

BEGIN;

DROP EXTENSION citext;

COMMIT;

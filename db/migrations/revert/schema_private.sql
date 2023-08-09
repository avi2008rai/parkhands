-- Revert PH:schema_private from pg

BEGIN;

DROP SCHEMA private;

COMMIT;

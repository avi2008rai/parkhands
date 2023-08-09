-- Revert PH:schema_api from pg

BEGIN;

DROP SCHEMA api;

COMMIT;

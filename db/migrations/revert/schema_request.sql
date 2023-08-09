-- Revert PH:schema_request from pg

BEGIN;

DROP SCHEMA request;

COMMIT;

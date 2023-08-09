-- Revert PH:schema_auth from pg

BEGIN;

DROP SCHEMA auth;

COMMIT;

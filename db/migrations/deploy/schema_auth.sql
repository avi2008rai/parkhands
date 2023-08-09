-- Deploy PH:schema_auth to pg

BEGIN;

CREATE SCHEMA auth;
COMMENT ON SCHEMA auth IS 'Authorisation functions';

COMMIT;

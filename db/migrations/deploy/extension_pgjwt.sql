-- Deploy PH:extension_pgjwt to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA public;
COMMENT ON EXTENSION pgjwt IS 'PostgreSQL implementation of JWTs';

COMMIT;

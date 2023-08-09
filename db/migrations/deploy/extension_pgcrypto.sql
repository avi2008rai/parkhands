-- Deploy PH:extension_pgcrypto to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA PUBLIC;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

COMMIT;

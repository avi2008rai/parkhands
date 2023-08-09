-- Deploy PH:schema_private to pg

BEGIN;

CREATE SCHEMA private;
COMMENT ON SCHEMA private IS 'Private application data';

COMMIT;

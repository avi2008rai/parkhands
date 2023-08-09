-- Deploy PH:schema_request to pg

BEGIN;

CREATE SCHEMA request;
GRANT USAGE ON SCHEMA request TO PUBLIC;
COMMENT ON SCHEMA request IS 'HTTP request information';

COMMIT;

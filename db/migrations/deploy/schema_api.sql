-- Deploy PH:schema_api to pg
-- requires: schema_private

BEGIN;

CREATE SCHEMA api;
COMMENT ON SCHEMA api IS 'Tables, views and functions exposed to GraphQL API';

COMMIT;

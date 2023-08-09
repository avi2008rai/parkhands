-- Deploy PH:schema_util to pg

BEGIN;

CREATE SCHEMA util;
COMMENT ON SCHEMA util IS 'application utility functions';

COMMIT;

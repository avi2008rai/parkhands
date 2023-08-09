-- Deploy PH:seq_short_code to pg
-- requires: schema_util

BEGIN;

CREATE SEQUENCE util.short_code;

COMMIT;

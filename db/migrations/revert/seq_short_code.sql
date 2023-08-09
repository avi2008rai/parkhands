-- Deploy PH:seq_short_code to pg
-- requires: schema_util

BEGIN;

DROP SEQUENCE util.short_code;

COMMIT;

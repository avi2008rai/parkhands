-- Deploy PH:seq_slug_uniqueness_sequence to pg
-- requires: schema_util

BEGIN;

  CREATE SEQUENCE util.slug_uniqueness_sequence MINVALUE 16777 INCREMENT BY 16;

COMMIT;

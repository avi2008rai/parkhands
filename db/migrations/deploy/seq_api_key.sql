-- Deploy PH:seq_api_key to pg
-- requires: schema_util

BEGIN;

CREATE SEQUENCE util.api_key
  INCREMENT BY 1
  MINVALUE 17210368
  START WITH 17210368;

COMMIT;

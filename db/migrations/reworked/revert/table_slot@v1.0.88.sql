-- Deploy PH:table_slot to pg
-- requires: schema_api

BEGIN;

  ALTER TABLE api.slot DROP COLUMN verification_status;

  ALTER TABLE api.slot DROP COLUMN parking_space_id;

COMMIT;

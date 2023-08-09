-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status

BEGIN;

  ALTER TABLE api.slot ALTER COLUMN verification_status
    SET DEFAULT 'verified'::slot_verification_status;

COMMIT;

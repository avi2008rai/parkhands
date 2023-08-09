-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status

BEGIN;

ALTER TABLE api.slot
DROP CONSTRAINT slot_timezone_check;

COMMIT;

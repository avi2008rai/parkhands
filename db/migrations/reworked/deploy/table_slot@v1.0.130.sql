-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status

BEGIN;

ALTER TABLE api.slot
ADD CONSTRAINT slot_timezone_check
  CHECK (
  	length(timezone) > 2
  );

COMMIT;

-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status

BEGIN;

  ALTER TABLE api.slot
    ADD COLUMN verification_status slot_verification_status NOT NULL
    DEFAULT 'pending'::slot_verification_status;

  ALTER TABLE api.slot
    ADD COLUMN parking_space_id UUID REFERENCES api.parking_space;

COMMIT;

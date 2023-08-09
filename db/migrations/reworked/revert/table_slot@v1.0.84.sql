-- Deploy PH:table_slot to pg
-- requires: schema_api

BEGIN;

  DROP TRIGGER trg_slot_soft_delete_record on api.slot;

  CREATE TRIGGER trg_slot_soft_delete_record
    BEFORE DELETE
    ON api.slot
    FOR EACH ROW EXECUTE PROCEDURE util.soft_delete_record();

COMMIT;

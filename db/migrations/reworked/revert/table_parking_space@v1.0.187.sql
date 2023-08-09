-- Deploy PH:table_parking_space to pg
-- requires: schema_api


BEGIN;

DROP TRIGGER trg_slot_soft_delete_record on api.parking_space;

COMMIT;

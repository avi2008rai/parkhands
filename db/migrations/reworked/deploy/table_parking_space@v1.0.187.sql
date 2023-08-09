-- Deploy PH:table_parking_space to pg
-- requires: schema_api


BEGIN;

    CREATE TRIGGER trg_space_soft_delete_record
    BEFORE DELETE
    ON api.parking_space
    FOR EACH ROW EXECUTE PROCEDURE util.soft_delete_space();

COMMIT;

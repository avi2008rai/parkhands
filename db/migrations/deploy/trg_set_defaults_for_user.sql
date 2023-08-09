-- Deploy PH:trg_set_defaults_for_user to pg

BEGIN;

  CREATE TRIGGER trg_set_defaults_for_user
    AFTER INSERT
    ON api.user
    FOR EACH ROW EXECUTE PROCEDURE util.set_defaults_for_user();

COMMIT;

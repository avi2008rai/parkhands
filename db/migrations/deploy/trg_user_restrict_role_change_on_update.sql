-- Deploy PH:trg_restrict_role_change to pg
-- requires: fn_restrict_role_change

BEGIN;

  CREATE TRIGGER trg_user_restrict_role_change_on_update
    BEFORE UPDATE OF role
    ON api.user
    FOR EACH ROW
      WHEN (OLD.role IS DISTINCT FROM NEW.role)
      EXECUTE PROCEDURE util.restrict_role_change();

COMMIT;

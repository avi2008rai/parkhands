-- Deploy PH:trg_user_restrict_role_change_on_insert to pg
-- requires: fn_restrict_role_change

BEGIN;

  CREATE TRIGGER trg_user_restrict_role_change_on_insert
    BEFORE INSERT
    ON api.user
    FOR EACH ROW
      WHEN (current_user <> 'postgres')
      EXECUTE PROCEDURE util.restrict_role_change();

COMMIT;

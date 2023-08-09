-- Revert PH:trg_user_restrict_role_change_on_update from pg

BEGIN;

DROP TRIGGER trg_user_restrict_role_change_on_update ON api.user;

COMMIT;

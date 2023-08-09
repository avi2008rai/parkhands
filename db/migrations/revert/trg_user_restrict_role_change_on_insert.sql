-- Revert PH:trg_user_restrict_role_change_on_insert from pg

BEGIN;

DROP TRIGGER trg_user_restrict_role_change_on_insert ON api.user;

COMMIT;

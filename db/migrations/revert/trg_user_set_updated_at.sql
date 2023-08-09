-- Revert PH:trg_user_set_updated_at from pg

BEGIN;

DROP TRIGGER trg_user_set_updated_at ON api.user;

COMMIT;

-- Revert PH:trg_user_soft_delete_user to pg

BEGIN;

DROP TRIGGER trg_user_soft_delete_user ON api.user;

COMMIT;

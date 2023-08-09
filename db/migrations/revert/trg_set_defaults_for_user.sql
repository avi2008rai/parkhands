-- Revert PH:trg_set_defaults_for_user from pg

BEGIN;

  DROP TRIGGER trg_set_defaults_for_user ON api.user;

COMMIT;

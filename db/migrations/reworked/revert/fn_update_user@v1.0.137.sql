-- Revert PH:fn_update_user from pg

BEGIN;

  DROP FUNCTION IF EXISTS api.update_user(payload api.update_user_input);
  DROP TYPE IF EXISTS api.update_user_input;

COMMIT;

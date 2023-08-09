-- Revert PH:fn_activate_user from pg

BEGIN;

  DROP FUNCTION IF EXISTS api.activate_user(payload api.activate_user_input);
  DROP TYPE IF EXISTS api.activate_user_input;

COMMIT;

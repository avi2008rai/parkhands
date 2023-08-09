-- Revert PH:fn_login to pg

BEGIN;

  DROP FUNCTION IF EXISTS api.login(payload api.login_input);
  DROP TYPE IF EXISTS api.login_input;

COMMIT;

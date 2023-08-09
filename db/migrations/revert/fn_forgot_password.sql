-- Revert PH:fn_forgot_password from pg

BEGIN;

  DROP FUNCTION IF EXISTS api.forgot_password(payload api.forgot_password_input);
  DROP TYPE IF EXISTS api.forgot_password_input;

COMMIT;

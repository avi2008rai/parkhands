-- Revert PH:fn_set_defaults_for_user from pg

BEGIN;

  DROP FUNCTION IF EXISTS util.set_defaults_for_user();

COMMIT;

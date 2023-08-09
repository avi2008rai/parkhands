-- Revert PH:fn_update_role_on_subscription from pg

BEGIN;

  DROP FUNCTION IF EXISTS util.update_role_on_subscription();

COMMIT;

-- Revert PH:fn_create_subscription_wh from pg

BEGIN;

  DROP FUNCTION IF EXISTS util.create_subscription_wh();

COMMIT;

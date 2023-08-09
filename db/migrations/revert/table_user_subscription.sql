-- Revert PH:table_user_subscription from pg

BEGIN;

  DROP TABLE api.user_subscription;

COMMIT;

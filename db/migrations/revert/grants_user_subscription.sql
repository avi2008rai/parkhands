-- Revert PH:grants_user_subscription from pg

BEGIN;

  REVOKE SELECT ON api.user_subscription FROM base_single;
  REVOKE INSERT ON api.user_subscription FROM base_single;
  REVOKE UPDATE ON api.user_subscription FROM base_single;
  REVOKE DELETE ON api.user_subscription FROM base_single;

  REVOKE SELECT ON api.user_subscription FROM base_super;
  REVOKE INSERT ON api.user_subscription FROM base_super;
  REVOKE UPDATE ON api.user_subscription FROM base_super;
  REVOKE DELETE ON api.user_subscription FROM base_super;

COMMIT;

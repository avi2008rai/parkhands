-- Revert PH:rls_user_subscription from pg

BEGIN;

  ALTER TABLE api.user_subscription DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.user_subscription;
  DROP POLICY crud_own_rows ON api.user_subscription;

COMMIT;

-- Revert PH:rls_billing_profile from pg

BEGIN;

  ALTER TABLE api.billing_profile DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.billing_profile;
  DROP POLICY crud_own_rows ON api.billing_profile;

COMMIT;

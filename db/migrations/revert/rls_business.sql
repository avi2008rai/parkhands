-- Revert PH:rls_business from pg

BEGIN;

  ALTER TABLE api.business DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.business;
  DROP POLICY crud_own_rows ON api.business;
  DROP POLICY select_enabled_rows ON api.business;

COMMIT;

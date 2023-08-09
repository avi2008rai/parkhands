-- Revert PH:rls_slot from pg

BEGIN;

  ALTER TABLE api.slot DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.slot;
  DROP POLICY crud_own_rows ON api.slot;
  DROP POLICY select_enabled_rows ON api.slot;

COMMIT;

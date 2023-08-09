-- Revert PH:rls_vehicle from pg

BEGIN;

  ALTER TABLE api.vehicle DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.vehicle;
  DROP POLICY crud_own_rows ON api.vehicle;

COMMIT;

-- Revert PH:rls_parking_space from pg

BEGIN;

  ALTER TABLE api.parking_space DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.parking_space;
  DROP POLICY crud_own_rows ON api.parking_space;
  DROP POLICY select_enabled_rows ON api.parking_space;

COMMIT;

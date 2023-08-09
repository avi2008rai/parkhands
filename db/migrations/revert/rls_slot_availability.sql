-- Revert PH:rls_slot_availability from pg

BEGIN;

  ALTER TABLE api.slot_availability DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.slot_availability;
  DROP POLICY crud_own_rows ON api.slot_availability;
  DROP POLICY select_enabled_rows ON api.slot_availability;

COMMIT;

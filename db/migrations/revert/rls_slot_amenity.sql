-- Revert PH:rls_slot_amenity from pg

BEGIN;

  ALTER TABLE api.slot_amenity DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.slot_amenity;
  DROP POLICY crud_own_rows ON api.slot_amenity;
  DROP POLICY select_enabled_rows ON api.slot_amenity;

COMMIT;

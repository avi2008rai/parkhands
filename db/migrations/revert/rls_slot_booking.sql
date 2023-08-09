-- Revert PH:rls_slot_booking from pg

BEGIN;

  ALTER TABLE timescale.slot_booking DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON timescale.slot_booking;
  DROP POLICY crud_slot_owner_rows ON timescale.slot_booking;
  DROP POLICY crud_own_rows ON timescale.slot_booking;

COMMIT;

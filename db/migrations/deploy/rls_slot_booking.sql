-- Deploy PH:rls_slot_booking to pg
-- requires: table_slot_booking

BEGIN;

  ALTER TABLE timescale.slot_booking ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON timescale.slot_booking
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_slot_owner_rows ON timescale.slot_booking
  USING (
    slot_id IN (SELECT id FROM api.slot WHERE owner_id = request.user_id() AND NOT deleted)
  );

  CREATE POLICY crud_own_rows ON timescale.slot_booking
  USING (
    user_id = request.user_id()
  );

COMMIT;

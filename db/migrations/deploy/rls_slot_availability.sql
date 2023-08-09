-- Deploy PH:rls_slot_availability to pg
-- requires: table_slot_availability

BEGIN;

  ALTER TABLE api.slot_availability ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.slot_availability
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.slot_availability
  USING (
    slot_id IN (SELECT id FROM api.slot WHERE owner_id = request.user_id())
  );

  CREATE POLICY select_enabled_rows ON api.slot_availability FOR SELECT
  USING (
    slot_id IN (SELECT id FROM api.slot WHERE status = 'enabled'::slot_status_t AND NOT deleted)
  );

COMMIT;

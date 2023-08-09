-- Deploy PH:rls_slot to pg
-- requires: table_slot

BEGIN;

  ALTER TABLE api.slot ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.slot
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
    AND NOT deleted
  );

  CREATE POLICY crud_own_rows ON api.slot
  USING (
    owner_id = request.user_id()
    AND NOT deleted
  );

  CREATE POLICY select_enabled_rows ON api.slot FOR SELECT
  USING (
    status = 'enabled'::slot_status_t
    AND NOT deleted
  );

COMMIT;

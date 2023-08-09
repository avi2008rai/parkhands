-- Deploy PH:rls_slot to pg
-- requires: table_slot

BEGIN;

  DROP POLICY select_enabled_rows ON api.slot;

  CREATE POLICY select_enabled_rows ON api.slot FOR SELECT
  USING (
    NOT deleted
  );

COMMIT;

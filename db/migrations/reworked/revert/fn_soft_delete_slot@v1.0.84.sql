-- Revert PH:fn_soft_delete_slot from pg

BEGIN;

  DROP FUNCTION util.soft_delete_slot();

COMMIT;

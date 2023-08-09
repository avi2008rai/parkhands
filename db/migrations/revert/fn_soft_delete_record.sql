-- Revert PH:fn_soft_delete_record to pg

BEGIN;

DROP FUNCTION util.soft_delete_record();

COMMIT;

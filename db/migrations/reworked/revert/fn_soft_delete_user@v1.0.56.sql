-- Revert PH:fn_soft_delete_user to pg

BEGIN;

DROP FUNCTION util.soft_delete_user();

COMMIT;

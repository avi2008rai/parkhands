-- Revert PH:fn_restrict_role_change from pg

BEGIN;

DROP FUNCTION util.restrict_role_change();

COMMIT;

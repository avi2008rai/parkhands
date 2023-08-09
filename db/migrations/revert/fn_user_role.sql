-- Revert PH:fn_user_role from pg

BEGIN;

DROP FUNCTION request.user_role();

COMMIT;

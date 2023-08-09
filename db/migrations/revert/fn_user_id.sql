-- Revert PH:fn_user_id from pg

BEGIN;

DROP FUNCTION request.user_id();

COMMIT;

-- Revert PH:fn_cookie from pg

BEGIN;

DROP FUNCTION request.cookie(TEXT);

COMMIT;

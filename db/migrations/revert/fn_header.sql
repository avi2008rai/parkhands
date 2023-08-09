-- Revert PH:fn_header from pg

BEGIN;

DROP FUNCTION request.header(TEXT);

COMMIT;

-- Revert PH:fn_env_var from pg

BEGIN;

DROP FUNCTION request.env_var(TEXT);

COMMIT;

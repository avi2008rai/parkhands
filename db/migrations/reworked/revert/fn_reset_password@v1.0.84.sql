-- Revert PH:fn_reset_password from pg

BEGIN;

DROP FUNCTION api.reset_password(payload JSON);

COMMIT;

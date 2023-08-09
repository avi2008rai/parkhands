-- Revert PH:fn_refresh_token to pg

BEGIN;

DROP FUNCTION api.refresh_token();

COMMIT;

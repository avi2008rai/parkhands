-- Revert PH:fn_me to pg

BEGIN;

DROP FUNCTION api.me();

COMMIT;

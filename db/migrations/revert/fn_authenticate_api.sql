-- Revert PH:fn_authenticate_api from pg

BEGIN;

DROP FUNCTION IF EXISTS api.authenticate_api(TEXT);

COMMIT;

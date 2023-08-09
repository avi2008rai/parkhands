-- Revert PH:fn_delete_api_key from pg

BEGIN;

DROP FUNCTION IF EXISTS api.delete_api_key(payload api.delete_api_key_input);

COMMIT;

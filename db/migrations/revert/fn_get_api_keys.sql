-- Revert PH:fn_get_api_keys from pg

BEGIN;

DROP FUNCTION IF EXISTS api.get_api_keys(UUID);
DROP TYPE IF EXISTS api.get_api_keys_result;

COMMIT;

-- Revert PH:fn_create_api_key from pg

BEGIN;

DROP FUNCTION IF EXISTS api.create_api_key(payload api.create_api_key_input);
DROP TYPE IF EXISTS api.create_api_key_input;
DROP TYPE IF EXISTS api.create_api_key_result;

COMMIT;

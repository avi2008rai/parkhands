-- Revert PH:fn_encrypt_api_key from pg

BEGIN;

DROP FUNCTION auth.encrypt_api_key();

COMMIT;

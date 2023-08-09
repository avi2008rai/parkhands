-- Verify PH:fn_encrypt_api_key on pg

DO $$
BEGIN

ASSERT (SELECT NOT has_function_privilege('public', 'auth.encrypt_api_key()', 'EXECUTE'));
ASSERT (SELECT has_function_privilege('auth.encrypt_api_key()', 'EXECUTE'));

END $$;

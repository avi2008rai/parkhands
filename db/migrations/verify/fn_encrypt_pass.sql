-- Verify PH:fn_encrypt_pass on pg

DO $$
BEGIN

ASSERT (SELECT NOT has_function_privilege('public', 'auth.encrypt_pass()', 'EXECUTE'));
ASSERT (SELECT has_function_privilege('auth.encrypt_pass()', 'EXECUTE'));

END $$;

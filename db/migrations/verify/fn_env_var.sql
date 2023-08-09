-- Verify PH:fn_env_var on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('request.env_var(text)', 'EXECUTE'));

END $$;

-- Verify PH:fn_cookie on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('request.cookie(text)', 'EXECUTE'));

END $$;

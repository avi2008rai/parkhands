-- Verify PH:fn_user_role on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('request.user_role()', 'EXECUTE'));

END $$;

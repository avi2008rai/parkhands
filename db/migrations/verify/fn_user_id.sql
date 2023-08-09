-- Verify PH:fn_user_id on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('request.user_id()', 'EXECUTE'));

END $$;

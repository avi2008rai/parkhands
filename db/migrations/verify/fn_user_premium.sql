-- Verify PH:fn_user_premium on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.user_premium(UUID)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('public'
    , 'api.user_premium(UUID)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('base_single'
    , 'api.user_premium(UUID)', 'EXECUTE'));

END $$;

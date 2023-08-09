-- Verify PH:fn_me on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.me()', 'EXECUTE'));

ASSERT (SELECT NOT has_function_privilege('public'
    , 'api.me()', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('base_single'
    , 'api.me()', 'EXECUTE'));

END $$;

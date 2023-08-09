-- Verify PH:fn_refresh_token on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.refresh_token()', 'EXECUTE'));

ASSERT (SELECT NOT has_function_privilege('public'
    , 'api.refresh_token()', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('base_single'
    , 'api.refresh_token()', 'EXECUTE'));

END $$;

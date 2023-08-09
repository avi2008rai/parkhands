-- Verify PH:fn_login on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.login(api.login_input)', 'EXECUTE'));

ASSERT (SELECT NOT has_function_privilege('public'
    , 'api.login(api.login_input)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('app_anonymous'
    , 'api.login(api.login_input)', 'EXECUTE'));

ASSERT (SELECT NOT has_function_privilege('base_single'
    , 'api.login(api.login_input)', 'EXECUTE'));

END $$;

-- Verify PH:fn_forgot_password on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.forgot_password(api.forgot_password_input)', 'EXECUTE'));

ASSERT (SELECT NOT has_function_privilege('public'
    , 'api.forgot_password(api.forgot_password_input)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('app_anonymous'
    , 'api.forgot_password(api.forgot_password_input)', 'EXECUTE'));

END $$;

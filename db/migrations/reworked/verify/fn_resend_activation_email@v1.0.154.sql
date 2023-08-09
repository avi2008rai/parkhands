-- Verify PH:fn_resend_activation_email on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.resend_activation_email(email)', 'EXECUTE'));

ASSERT (SELECT NOT has_function_privilege('public'
    , 'api.resend_activation_email(email)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('app_anonymous'
    , 'api.resend_activation_email(email)', 'EXECUTE'));

END $$;

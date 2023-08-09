-- Verify PH:fn_email_available on pg

DO $$
BEGIN

ASSERT (SELECT has_function_privilege('api.email_available(email)', 'EXECUTE'));

ASSERT (SELECT NOT has_function_privilege('public'
    , 'api.email_available(email)', 'EXECUTE'));

ASSERT (SELECT has_function_privilege('base_single'
    , 'api.email_available(email)', 'EXECUTE'));

END $$;

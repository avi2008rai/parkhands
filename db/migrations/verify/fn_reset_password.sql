-- Verify PH:fn_reset_password on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.reset_password(api.reset_password_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege('public'
      , 'api.reset_password(api.reset_password_input)', 'EXECUTE'));

  ASSERT (SELECT has_function_privilege('base_single'
      , 'api.reset_password(api.reset_password_input)', 'EXECUTE'));

END $$;

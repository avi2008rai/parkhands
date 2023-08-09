-- Verify PH:fn_register on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.register(api.register_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
    'public'
    , 'api.register(api.register_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'app_anonymous'
    , 'api.register(api.register_input)'
    , 'EXECUTE'
  ));

END $$;


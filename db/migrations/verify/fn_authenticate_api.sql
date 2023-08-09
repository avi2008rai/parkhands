-- Verify PH:fn_authenticate_api on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.authenticate_api(text)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
    'public'
    , 'api.authenticate_api(text)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'app_anonymous'
    , 'api.authenticate_api(text)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'base_single'
    , 'api.authenticate_api(text)'
    , 'EXECUTE'
  ));

END $$;

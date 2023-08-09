-- Verify PH:fn_create_api_key on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.create_api_key(api.create_api_key_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
    'public'
    , 'api.create_api_key(api.create_api_key_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'base_single'
    , 'api.create_api_key(api.create_api_key_input)'
    , 'EXECUTE'
  ));

  ASSERT(SELECT has_type_privilege('api.create_api_key_input', 'usage'));
  ASSERT(SELECT has_type_privilege('api.create_api_key_result', 'usage'));

END $$;

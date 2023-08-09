-- Verify PH:fn_get_api_keys on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.get_api_keys(uuid)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
    'public'
    , 'api.get_api_keys(uuid)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'base_single'
    , 'api.get_api_keys(uuid)'
    , 'EXECUTE'
  ));

  ASSERT(SELECT has_type_privilege('api.get_api_keys_result', 'usage'));

END $$;

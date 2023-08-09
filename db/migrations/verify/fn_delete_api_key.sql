-- Verify PH:fn_delete_api_key on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.delete_api_key(UUID)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
    'public'
    , 'api.delete_api_key(UUID)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'base_single'
    , 'api.delete_api_key(UUID)'
    , 'EXECUTE'
  ));

  ASSERT(SELECT has_type_privilege('UUID', 'usage'));

END $$;

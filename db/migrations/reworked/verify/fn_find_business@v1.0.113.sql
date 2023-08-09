-- Verify PH:fn_find_business on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.find_business(api.find_business_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
    'public'
    , 'api.find_business(api.find_business_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'app_anonymous'
    , 'api.find_business(api.find_business_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
    'base_single'
    , 'api.find_business(api.find_business_input)'
    , 'EXECUTE'
  ));

  ASSERT(SELECT has_type_privilege('api.find_business_input', 'usage'));
  ASSERT(SELECT has_type_privilege('api.find_business_result', 'usage'));

END $$;

-- Verify PH:fn_find_slots on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.find_slots(api.find_slots_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
  	'public'
    , 'api.find_slots(api.find_slots_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
  	'app_anonymous'
    , 'api.find_slots(api.find_slots_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
  	'base_single'
    , 'api.find_slots(api.find_slots_input)'
    , 'EXECUTE'
  ));

  ASSERT(SELECT has_type_privilege('api.find_slots_input', 'usage'));
  ASSERT(SELECT has_type_privilege('api.find_slots_result', 'usage'));

END $$;

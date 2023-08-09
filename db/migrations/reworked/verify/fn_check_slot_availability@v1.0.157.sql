-- Verify PH:fn_check_slot_availability on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('util.check_slot_availability(util.check_slot_availability_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
  	'public'
    , 'util.check_slot_availability(util.check_slot_availability_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT NOT has_function_privilege(
  	'app_anonymous'
    , 'util.check_slot_availability(util.check_slot_availability_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT NOT has_function_privilege(
  	'base_single'
    , 'util.check_slot_availability(util.check_slot_availability_input)'
    , 'EXECUTE'
  ));

  ASSERT(SELECT has_type_privilege('util.check_slot_availability_input', 'usage'));

END $$;

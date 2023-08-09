-- Verify PH:fn_slot_booking_times on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.slot_booking_times(api.slot_booking_times_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege(
  	'public'
    , 'api.slot_booking_times(api.slot_booking_times_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
  	'app_anonymous'
    , 'api.slot_booking_times(api.slot_booking_times_input)'
    , 'EXECUTE'
  ));

  ASSERT (SELECT has_function_privilege(
  	'base_single'
    , 'api.slot_booking_times(api.slot_booking_times_input)'
    , 'EXECUTE'
  ));

  ASSERT(SELECT has_type_privilege('api.slot_booking_times_input', 'usage'));

END $$;

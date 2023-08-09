-- Verify PH:fn_slot_booking_status on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('api.slot_booking_status(api.slot_booking_status_input)', 'EXECUTE'));

  ASSERT (SELECT NOT has_function_privilege('public'
      , 'api.slot_booking_status(api.slot_booking_status_input)', 'EXECUTE'));

  ASSERT (SELECT has_function_privilege('app_anonymous'
      , 'api.slot_booking_status(api.slot_booking_status_input)', 'EXECUTE'));

  ASSERT (SELECT has_function_privilege('base_single'
      , 'api.slot_booking_status(api.slot_booking_status_input)', 'EXECUTE'));

END $$;

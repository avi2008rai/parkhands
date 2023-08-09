BEGIN;


  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'slot_booking_status', ARRAY['slot_booking_status_input']);
  SELECT function_lang_is('slot_booking_status', 'plpgsql');
  SELECT function_returns('slot_booking_status', 'slot_availability_booking_status');

  SELECT function_privs_are(
    'slot_booking_status'
    , ARRAY['slot_booking_status_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'slot_booking_status'
    , ARRAY['slot_booking_status_input']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'slot_booking_status'
    , ARRAY['slot_booking_status_input']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'slot_booking_status'
    , ARRAY['slot_booking_status_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

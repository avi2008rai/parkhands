BEGIN;

  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'active_booking'::NAME, ARRAY['api.active_booking_input']);
  SELECT function_lang_is('active_booking', 'plpgsql');
  SELECT function_returns('active_booking', 'slot_bookings');
  SELECT function_privs_are('active_booking', ARRAY['api.active_booking_input'], 'public', '{}');

  SELECT function_privs_are(
    'active_booking'
    , ARRAY['api.active_booking_input']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'active_booking'
    , ARRAY['api.active_booking_input']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'active_booking'
    , ARRAY['api.active_booking_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

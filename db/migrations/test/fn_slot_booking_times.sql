BEGIN;

  SELECT plan(12);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'slot_booking_times', ARRAY['slot_booking_times_input']);
  SELECT function_lang_is('slot_booking_times', 'plpgsql');
  SELECT function_returns('slot_booking_times', 'setof record');

  SELECT function_privs_are(
    'slot_booking_times'
    , ARRAY['slot_booking_times_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'slot_booking_times'
    , ARRAY['slot_booking_times_input']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'slot_booking_times'
    , ARRAY['slot_booking_times_input']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'slot_booking_times'
    , ARRAY['slot_booking_times_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );


  SELECT has_type('api'::NAME, 'slot_booking_times_input'::NAME);

  SELECT columns_are('api'::NAME, 'slot_booking_times_input'::NAME,
          ARRAY[
              'slot_ids'
              , 'start_time'
              , 'end_time'
              ]);

  SELECT col_type_is('api'::NAME, 'slot_booking_times_input'::NAME, 'slot_ids'::NAME, 'uuid[]');
  SELECT col_type_is('api'::NAME, 'slot_booking_times_input'::NAME, 'start_time'::NAME, 'timestamp with time zone');
  SELECT col_type_is('api'::NAME, 'slot_booking_times_input'::NAME, 'end_time'::NAME, 'timestamp with time zone');

  SELECT finish();

ROLLBACK;

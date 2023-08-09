BEGIN;

  SELECT plan(12);

  SET search_path TO util, PUBLIC;

  SELECT has_function('util', 'check_slot_availability', ARRAY['check_slot_availability_input']);
  SELECT function_lang_is('check_slot_availability', 'plpgsql');
  SELECT function_returns('check_slot_availability', 'setof uuid[]');

  SELECT function_privs_are(
    'check_slot_availability'
    , ARRAY['check_slot_availability_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'check_slot_availability'
    , ARRAY['check_slot_availability_input']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'check_slot_availability'
    , ARRAY['check_slot_availability_input']
    , 'app_single_member'
    , '{}'
  );

  SELECT function_privs_are(
    'check_slot_availability'
    , ARRAY['check_slot_availability_input']
    , 'app_super_admin'
    , '{}'
  );

  SELECT has_type('util'::NAME, 'check_slot_availability_input'::NAME);

  SELECT columns_are('util'::NAME, 'check_slot_availability_input'::NAME,
          ARRAY[
              'slot_ids'
              , 'start_time'
              , 'end_time'
              ]);

  SELECT col_type_is('util'::NAME, 'check_slot_availability_input'::NAME, 'slot_ids'::NAME, 'uuid[]');
  SELECT col_type_is('util'::NAME, 'check_slot_availability_input'::NAME, 'start_time'::NAME, 'timestamp with time zone');
  SELECT col_type_is('util'::NAME, 'check_slot_availability_input'::NAME, 'end_time'::NAME, 'timestamp with time zone');

  SELECT finish();

ROLLBACK;

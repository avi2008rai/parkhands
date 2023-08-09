BEGIN;

  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'slot_timetable', ARRAY['uuid[]', 'timestamptz', 'timestamptz']);
  SELECT function_lang_is('slot_timetable', 'plpgsql');
  SELECT function_returns('slot_timetable', 'setof slot_timetable_result');

  SELECT function_privs_are(
    'slot_timetable'
    , ARRAY['uuid[]', 'timestamptz', 'timestamptz']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'slot_timetable'
    , ARRAY['uuid[]', 'timestamptz', 'timestamptz']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'slot_timetable'
    , ARRAY['uuid[]', 'timestamptz', 'timestamptz']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'slot_timetable'
    , ARRAY['uuid[]', 'timestamptz', 'timestamptz']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

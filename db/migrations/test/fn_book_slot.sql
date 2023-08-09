BEGIN;

  SELECT plan(7);

  SET search_path TO api, timescale, PUBLIC;

  SELECT has_function('api', 'book_slot', ARRAY['api.book_slot_input']);
  SELECT function_lang_is('book_slot', 'plpgsql');
  SELECT function_returns('book_slot', 'slot_bookings');
  SELECT function_privs_are('book_slot', ARRAY['api.book_slot_input'], 'public', '{}');

  SELECT function_privs_are(
    'book_slot'
    , ARRAY['api.book_slot_input']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'book_slot'
    , ARRAY['api.book_slot_input']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'book_slot'
    , ARRAY['api.book_slot_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

BEGIN;


  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'reset_password', ARRAY['reset_password_input']);
  SELECT function_lang_is('reset_password', 'plpgsql');
  SELECT function_returns('reset_password', 'boolean');

  SELECT function_privs_are(
    'reset_password'
    , ARRAY['reset_password_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'reset_password'
    , ARRAY['reset_password_input']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'reset_password'
    , ARRAY['reset_password_input']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'reset_password'
    , ARRAY['reset_password_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

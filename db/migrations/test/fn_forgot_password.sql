BEGIN;


  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'forgot_password', ARRAY['api.forgot_password_input']);
  SELECT function_lang_is('forgot_password', 'plpgsql');
  SELECT function_returns('forgot_password', 'boolean');

  SELECT function_privs_are(
    'forgot_password'
    , ARRAY['api.forgot_password_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'forgot_password'
    , ARRAY['api.forgot_password_input']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'forgot_password'
    , ARRAY['api.forgot_password_input']
    , 'app_single_member'
    , '{}'
  );

  SELECT function_privs_are(
    'forgot_password'
    , ARRAY['api.forgot_password_input']
    , 'app_super_admin'
    , '{}'
  );

  SELECT finish();

ROLLBACK;

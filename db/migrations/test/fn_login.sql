BEGIN;

  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'login', ARRAY['api.login_input']);
  SELECT function_lang_is('login', 'plpgsql');
  SELECT function_returns('login', 'jwt_token');

  SELECT function_privs_are(
    'login'
    , ARRAY['api.login_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'login'
    , ARRAY['api.login_input']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'login'
    , ARRAY['api.login_input']
    , 'app_single_member'
    , '{}'
  );

  SELECT function_privs_are(
    'login'
    , ARRAY['api.login_input']
    , 'app_super_admin'
    , '{}'
  );

  SELECT finish();

ROLLBACK;

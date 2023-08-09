BEGIN;


  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'create_user', ARRAY['api.create_user_input']);
  SELECT function_lang_is('create_user', 'plpgsql');
  SELECT function_returns('create_user', '"user"');

  SELECT function_privs_are(
    'create_user'
    , ARRAY['api.create_user_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'create_user'
    , ARRAY['api.create_user_input']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'create_user'
    , ARRAY['api.create_user_input']
    , 'app_single_member'
    , '{}'
  );

  SELECT function_privs_are(
    'create_user'
    , ARRAY['api.create_user_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

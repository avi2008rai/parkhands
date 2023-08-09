BEGIN;
  SELECT plan(7);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'user_premium', ARRAY['uuid']);
  SELECT function_lang_is('user_premium', 'plpgsql');
  SELECT function_returns('user_premium', 'boolean');

  SELECT function_privs_are(
    'user_premium'
    , ARRAY['uuid']
    , 'public'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'user_premium'
    , ARRAY['uuid']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'user_premium'
    , ARRAY['uuid']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'user_premium'
    , ARRAY['uuid']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();
ROLLBACK;

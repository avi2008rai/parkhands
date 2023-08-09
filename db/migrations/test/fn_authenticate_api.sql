BEGIN;

  SELECT plan(10);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'authenticate_api', ARRAY['text']);
  SELECT function_lang_is('authenticate_api', 'plpgsql');
  SELECT function_returns('authenticate_api', 'json');
  SELECT function_privs_are('authenticate_api', ARRAY['text'], 'public', '{}');

  SELECT function_privs_are(
    'authenticate_api'
    , ARRAY['text']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'authenticate_api'
    , ARRAY['text']
    , 'app_anonymous'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'authenticate_api'
    , ARRAY['text']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'authenticate_api'
    , ARRAY['text']
    , 'app_provider'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'authenticate_api'
    , ARRAY['text']
    , 'app_provider_premium'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'authenticate_api'
    , ARRAY['text']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

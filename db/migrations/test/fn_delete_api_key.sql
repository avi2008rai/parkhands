BEGIN;

  SELECT plan(10);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'delete_api_key', ARRAY['uuid']);
  SELECT function_lang_is('delete_api_key', 'plpgsql');
  SELECT function_returns('delete_api_key', 'boolean');
  SELECT function_privs_are('delete_api_key', ARRAY['uuid'], 'public', '{}');

  SELECT function_privs_are(
    'delete_api_key'
    , ARRAY['uuid']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'delete_api_key'
    , ARRAY['uuid']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'delete_api_key'
    , ARRAY['uuid']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'delete_api_key'
    , ARRAY['uuid']
    , 'app_provider'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'delete_api_key'
    , ARRAY['uuid']
    , 'app_provider_premium'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'delete_api_key'
    , ARRAY['uuid']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT finish();

ROLLBACK;

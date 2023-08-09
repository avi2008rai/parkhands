BEGIN;

  SELECT plan(17);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'get_api_keys', ARRAY['uuid']);
  SELECT function_lang_is('get_api_keys', 'plpgsql');
  SELECT function_returns('get_api_keys', 'setof get_api_keys_result');
  SELECT function_privs_are('get_api_keys', ARRAY['uuid'], 'public', '{}');

  SELECT function_privs_are(
    'get_api_keys'
    , ARRAY['uuid']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'get_api_keys'
    , ARRAY['uuid']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'get_api_keys'
    , ARRAY['uuid']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'get_api_keys'
    , ARRAY['uuid']
    , 'app_provider'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'get_api_keys'
    , ARRAY['uuid']
    , 'app_provider_premium'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'get_api_keys'
    , ARRAY['uuid']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT has_type('api'::NAME, 'get_api_keys_result'::NAME);

  SELECT columns_are('api'::NAME, 'get_api_keys_result'::NAME,
          ARRAY[
              'id'
              , 'user_id'
              , 'description'
              , 'expire_at'
              , 'created_at'
              ]);

  SELECT col_type_is('api'::NAME, 'get_api_keys_result'::NAME, 'id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'get_api_keys_result'::NAME, 'user_id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'get_api_keys_result'::NAME, 'description'::NAME, 'text');
  SELECT col_type_is('api'::NAME, 'get_api_keys_result'::NAME, 'expire_at'::NAME, 'timestamp with time zone');
  SELECT col_type_is('api'::NAME, 'get_api_keys_result'::NAME, 'created_at'::NAME, 'timestamp with time zone');

  SELECT finish();

ROLLBACK;

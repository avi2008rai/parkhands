BEGIN;

  SELECT plan(23);

  SET search_path TO api, PUBLIC;

  SELECT has_function('api', 'create_api_key', ARRAY['api.create_api_key_input']);
  SELECT function_lang_is('create_api_key', 'plpgsql');
  SELECT function_returns('create_api_key', 'create_api_key_result');
  SELECT function_privs_are('create_api_key', ARRAY['api.create_api_key_input'], 'public', '{}');

  SELECT function_privs_are(
    'create_api_key'
    , ARRAY['api.create_api_key_input']
    , 'public'
    , '{}'
  );

  SELECT function_privs_are(
    'create_api_key'
    , ARRAY['api.create_api_key_input']
    , 'app_anonymous'
    , '{}'
  );

  SELECT function_privs_are(
    'create_api_key'
    , ARRAY['api.create_api_key_input']
    , 'app_single_member'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'create_api_key'
    , ARRAY['api.create_api_key_input']
    , 'app_provider'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'create_api_key'
    , ARRAY['api.create_api_key_input']
    , 'app_provider_premium'
    , ARRAY['EXECUTE']
  );

  SELECT function_privs_are(
    'create_api_key'
    , ARRAY['api.create_api_key_input']
    , 'app_super_admin'
    , ARRAY['EXECUTE']
  );

  SELECT has_type('api'::NAME, 'create_api_key_input'::NAME);

  SELECT columns_are('api'::NAME, 'create_api_key_input'::NAME,
          ARRAY[
              'user_id'
              , 'description'
              , 'expire_at'
              ]);

  SELECT col_type_is('api'::NAME, 'create_api_key_input'::NAME, 'user_id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'create_api_key_input'::NAME, 'description'::NAME, 'text');
  SELECT col_type_is('api'::NAME, 'create_api_key_input'::NAME, 'expire_at'::NAME, 'interval');

  SELECT has_type('api'::NAME, 'create_api_key_result'::NAME);

  SELECT columns_are('api'::NAME, 'create_api_key_result'::NAME,
          ARRAY[
              'id'
              , 'user_id'
              , 'api_key'
              , 'description'
              , 'expire_at'
              , 'created_at'
              ]);

  SELECT col_type_is('api'::NAME, 'create_api_key_result'::NAME, 'id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'create_api_key_result'::NAME, 'user_id'::NAME, 'uuid');
  SELECT col_type_is('api'::NAME, 'create_api_key_result'::NAME, 'api_key'::NAME, 'text');
  SELECT col_type_is('api'::NAME, 'create_api_key_result'::NAME, 'description'::NAME, 'text');
  SELECT col_type_is('api'::NAME, 'create_api_key_result'::NAME, 'expire_at'::NAME, 'timestamp with time zone');
  SELECT col_type_is('api'::NAME, 'create_api_key_result'::NAME, 'created_at'::NAME, 'timestamp with time zone');

  SELECT finish();

ROLLBACK;

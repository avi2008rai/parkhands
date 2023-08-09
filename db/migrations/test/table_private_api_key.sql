BEGIN;

  SELECT	  plan(35);

  SET SEARCH_PATH TO private, public;

  SELECT has_table('api_key');
  SELECT has_pk('api_key');
  SELECT columns_are(
    'api_key',
    ARRAY[
      'id'
      , 'user_id'
      , 'api_key'
      , 'description'
      , 'expire_at'
      , 'created_at'
      ]
  );
  SELECT has_column(        'api_key', 'id');
  SELECT col_type_is(       'api_key', 'id', 'uuid');
  SELECT col_default_is(    'api_key', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'api_key', 'id');

  SELECT has_column(        'api_key', 'user_id');
  SELECT col_type_is(       'api_key', 'user_id', 'uuid');
  SELECT col_not_null(      'api_key', 'user_id');
  SELECT col_has_default(   'api_key', 'user_id');
  SELECT col_default_is(    'api_key', 'user_id', $$request.user_id()$$);
  SELECT fk_ok(             'api_key', 'user_id', 'user', 'id');

  SELECT has_column(        'api_key', 'api_key');
  SELECT col_type_is(       'api_key', 'api_key', 'text');
  SELECT col_hasnt_default( 'api_key', 'api_key');
  SELECT col_not_null(      'api_key', 'api_key');

  SELECT has_column(        'api_key', 'description');
  SELECT col_type_is(       'api_key', 'description', 'text');
  SELECT col_hasnt_default( 'api_key', 'description');
  SELECT col_not_null(      'api_key', 'description');

  SELECT has_column(        'api_key', 'expire_at');
  SELECT col_type_is(       'api_key', 'expire_at', 'timestamp with time zone');
  SELECT col_is_null(       'api_key', 'expire_at');
  SELECT col_hasnt_default( 'api_key', 'expire_at');

  SELECT has_column(        'api_key', 'created_at');
  SELECT col_type_is(       'api_key', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'api_key', 'created_at');
  SELECT col_has_default(   'api_key', 'created_at');
  SELECT col_default_is(    'api_key', 'created_at', 'now()');

  SELECT indexes_are(
    'private',
    'api_key',
    ARRAY[
      'api_key_pkey'
      , 'api_key_unique_idx'
    ]
  );

  SELECT has_index(
    'api_key'
    , 'api_key_pkey'::NAME
    , ARRAY['id']
  );

  SELECT has_index(
    'api_key'
    , 'api_key_unique_idx'::NAME
    , ARRAY['api_key']
  );

  SELECT triggers_are(
    'private',
    'api_key',
    ARRAY[
      'trg_api_key_encrypt_api_key'
      ]);

  SELECT trigger_is('private', 'api_key', 'trg_api_key_encrypt_api_key', 'auth', 'encrypt_api_key');

  SELECT	  finish();

ROLLBACK;

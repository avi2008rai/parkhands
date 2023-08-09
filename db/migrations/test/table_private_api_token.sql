BEGIN;

  SELECT	  plan(21);

  SET SEARCH_PATH TO private, public;

  SELECT has_table('api_token');
  SELECT hasnt_pk('api_token');
  SELECT columns_are(
    'api_token',
    ARRAY[
      'api_key_id'
      , 'api_token'
      , 'expire_at'
      , 'created_at'
      ]
  );

  SELECT has_column(        'api_token', 'api_key_id');
  SELECT col_type_is(       'api_token', 'api_key_id', 'uuid');
  SELECT col_not_null(      'api_token', 'api_key_id');
  SELECT col_hasnt_default( 'api_token', 'api_key_id');
  SELECT fk_ok(             'api_token', 'api_key_id', 'api_key', 'id');

  SELECT has_column(        'api_token', 'api_token');
  SELECT col_type_is(       'api_token', 'api_token', 'text');
  SELECT col_hasnt_default( 'api_token', 'api_token');
  SELECT col_not_null(      'api_token', 'api_token');

  SELECT has_column(        'api_token', 'expire_at');
  SELECT col_type_is(       'api_token', 'expire_at', 'bigint');
  SELECT col_is_null(       'api_token', 'expire_at');
  SELECT col_hasnt_default( 'api_token', 'expire_at');

  SELECT has_column(        'api_token', 'created_at');
  SELECT col_type_is(       'api_token', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'api_token', 'created_at');
  SELECT col_has_default(   'api_token', 'created_at');
  SELECT col_default_is(    'api_token', 'created_at', 'now()');

  SELECT	  finish();

ROLLBACK;

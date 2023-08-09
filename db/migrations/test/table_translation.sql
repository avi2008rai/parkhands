BEGIN;

  SELECT plan(39);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('translation');
  SELECT has_pk('translation');
  SELECT columns_are(
    'translation',
    ARRAY[
      'id'
      , 'key'
      , 'lang'
      , 'translation'
      , 'namespace'
      , 'created_at'
      , 'updated_at'
      ]
  );

  SELECT has_column(        'translation', 'id');
  SELECT col_type_is(       'translation', 'id', 'uuid');
  SELECT col_default_is(    'translation', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'translation', 'id');

  SELECT has_column(        'translation', 'key');
  SELECT col_type_is(       'translation', 'key', 'citext');
  SELECT col_hasnt_default( 'translation', 'key');
  SELECT col_not_null(      'translation', 'key');

  SELECT has_column(        'translation', 'lang');
  SELECT col_type_is(       'translation', 'lang', 'character(2)');
  SELECT col_not_null(      'translation', 'lang');
  SELECT col_hasnt_default( 'translation', 'lang');
  SELECT fk_ok(             'translation', 'lang', 'language', 'code');

  SELECT has_column(        'translation', 'translation');
  SELECT col_type_is(       'translation', 'translation', 'text');
  SELECT col_not_null(      'translation', 'translation');
  SELECT col_hasnt_default( 'translation', 'translation');

  SELECT has_column(        'translation', 'namespace');
  SELECT col_type_is(       'translation', 'namespace', 'citext');
  SELECT col_is_null(       'translation', 'namespace');
  SELECT col_hasnt_default( 'translation', 'namespace');

  SELECT has_column(        'translation', 'created_at');
  SELECT col_type_is(       'translation', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'translation', 'created_at');
  SELECT col_has_default(   'translation', 'created_at');
  SELECT col_default_is(    'translation', 'created_at', 'now()');

  SELECT has_column(        'translation', 'updated_at');
  SELECT col_type_is(       'translation', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'translation', 'updated_at');
  SELECT col_hasnt_default( 'translation', 'updated_at');

  SELECT indexes_are(
    'translation',
    ARRAY[
      'translation_pkey'
      , 'translation_namespace_idx'
      , 'translation_unique_idx'
    ]
  );

  SELECT has_index(
    'translation',
    'translation_pkey'::NAME,
    ARRAY['id']
  );

  SELECT has_index(
    'translation',
    'translation_unique_idx'::NAME,
    ARRAY['key', 'lang']
  );

  SELECT has_index(
    'translation',
    'translation_namespace_idx'::NAME,
    ARRAY['namespace', 'lang']
  );

  SELECT triggers_are(
    'api', 'translation', ARRAY[
      'trg_translation_set_updated_at'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'translation'
    , 'trg_translation_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT	  finish();

ROLLBACK;

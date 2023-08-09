BEGIN;

  SELECT	  plan(19);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('language');
  SELECT has_pk('language');
  SELECT columns_are(
    'language',
    ARRAY[
      'code'
      , 'name'
      , 'weight'
      ]
  );

  SELECT has_column(        'language', 'code');
  SELECT col_type_is(       'language', 'code', 'character(2)');
  SELECT col_hasnt_default( 'language', 'code');
  SELECT col_not_null(      'language', 'code');
  SELECT col_is_pk(         'language', 'code');

  SELECT has_column(        'language', 'name');
  SELECT col_type_is(       'language', 'name', 'text');
  SELECT col_not_null(      'language', 'name');
  SELECT col_hasnt_default( 'language', 'name');

  SELECT has_column(        'language', 'weight');
  SELECT col_type_is(       'language', 'weight', 'integer');
  SELECT col_not_null(      'language', 'weight');
  SELECT col_has_default(   'language', 'weight');
  SELECT col_default_is(    'language', 'weight', '0');

  SELECT indexes_are(
    'language',
    ARRAY[
      'language_pkey'
      ]);

  SELECT has_index('language', 'language_pkey'::NAME, ARRAY['code']);

  SELECT	  finish();

ROLLBACK;

BEGIN;

  SELECT	  plan(28);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('country');
  SELECT has_pk('country');
  SELECT columns_are(
    'country',
    ARRAY[
      'id'
      , 'code'
      , 'name'
      , 'status'
      ]
  );

  SELECT has_column(        'country', 'id');
  SELECT col_type_is(       'country', 'id', 'uuid');
  SELECT col_has_default(   'country', 'id');
  SELECT col_default_is(    'country', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'country', 'id');
  SELECT col_is_pk(         'country', 'id');

  SELECT has_column(        'country', 'code');
  SELECT col_type_is(       'country', 'code', 'citext');
  SELECT col_not_null(      'country', 'code');
  SELECT col_hasnt_default( 'country', 'code');
  SELECT col_is_unique(     'country', 'code');

  SELECT has_column(        'country', 'name');
  SELECT col_type_is(       'country', 'name', 'citext');
  SELECT col_not_null(      'country', 'name');
  SELECT col_hasnt_default( 'country', 'name');
  SELECT col_is_unique(     'country', 'name');

  SELECT has_column(        'country', 'status');
  SELECT col_type_is(       'country', 'status', 'status_t');
  SELECT col_not_null(      'country', 'status');
  SELECT col_has_default(   'country', 'status');
  SELECT col_default_is(    'country', 'status', 'enabled');


  SELECT indexes_are(
    'country',
    ARRAY[
      'country_pkey'
      , 'country_code_ukey'
      , 'country_name_ukey'
      ]);

  SELECT has_index('country', 'country_pkey'::NAME, ARRAY['id']);
  SELECT has_index('country', 'country_code_ukey'::NAME, ARRAY['code']);
  SELECT has_index('country', 'country_name_ukey'::NAME, ARRAY['name']);

  SELECT	  finish();

ROLLBACK;

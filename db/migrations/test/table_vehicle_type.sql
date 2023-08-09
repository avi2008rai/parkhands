BEGIN;

  SELECT	  plan(19);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('vehicle_type');
  SELECT has_pk('vehicle_type');
  SELECT columns_are(
    'vehicle_type',
    ARRAY[
      'id'
      , 'name'
      , 'weight'
      ]
  );

  SELECT has_column(        'vehicle_type', 'id');
  SELECT col_type_is(       'vehicle_type', 'id', 'uuid');
  SELECT col_default_is(    'vehicle_type', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'vehicle_type', 'id');

  SELECT has_column(        'vehicle_type', 'name');
  SELECT col_type_is(       'vehicle_type', 'name', 'citext');
  SELECT col_hasnt_default( 'vehicle_type', 'name');
  SELECT col_not_null(      'vehicle_type', 'name');

  SELECT has_column(        'vehicle_type', 'weight');
  SELECT col_type_is(       'vehicle_type', 'weight', 'integer');
  SELECT col_not_null(      'vehicle_type', 'weight');
  SELECT col_has_default(   'vehicle_type', 'weight');
  SELECT col_default_is(    'vehicle_type', 'weight', '0');

  SELECT indexes_are(
    'vehicle_type',
    ARRAY[
    'vehicle_type_pkey'
    , 'vehicle_type_name_ukey'
    ]);

  SELECT has_index(
    'vehicle_type', 'vehicle_type_pkey'::NAME, ARRAY['id']);
  SELECT has_index(
    'vehicle_type', 'vehicle_type_name_ukey'::NAME, ARRAY['name']);

  SELECT	  finish();

ROLLBACK;

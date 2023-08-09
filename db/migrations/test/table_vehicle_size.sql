BEGIN;

  SELECT plan(38);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('vehicle_size');
  SELECT has_pk('vehicle_size');
  SELECT columns_are(
    'vehicle_size',
    ARRAY[
      'id'
      , 'name'
      , 'status'
      , 'weight'
      , 'description'
      , 'created_at'
      , 'updated_at'
    ]
  );

  SELECT has_column(        'vehicle_size', 'id');
  SELECT col_type_is(       'vehicle_size', 'id', 'uuid');
  SELECT col_default_is(    'vehicle_size', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'vehicle_size', 'id');

  SELECT has_column(        'vehicle_size', 'name');
  SELECT col_type_is(       'vehicle_size', 'name', 'citext');
  SELECT col_hasnt_default( 'vehicle_size', 'name');
  SELECT col_is_null(       'vehicle_size', 'name');

  SELECT has_column(        'vehicle_size', 'status');
  SELECT col_type_is(       'vehicle_size', 'status', 'content_status_t');
  SELECT col_not_null(      'vehicle_size', 'status');
  SELECT col_has_default(   'vehicle_size', 'status');
  SELECT col_default_is(    'vehicle_size', 'status', 'published');

  SELECT has_column(        'vehicle_size', 'weight');
  SELECT col_type_is(       'vehicle_size', 'weight', 'integer');
  SELECT col_not_null(      'vehicle_size', 'weight');
  SELECT col_has_default(   'vehicle_size', 'weight');
  SELECT col_default_is(    'vehicle_size', 'weight', '0');

  SELECT has_column(        'vehicle_size', 'description');
  SELECT col_type_is(       'vehicle_size', 'description', 'citext');
  SELECT col_hasnt_default( 'vehicle_size', 'description');
  SELECT col_is_null(       'vehicle_size', 'description');

  SELECT has_column(        'vehicle_size', 'created_at');
  SELECT col_type_is(       'vehicle_size', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'vehicle_size', 'created_at');
  SELECT col_has_default(   'vehicle_size', 'created_at');
  SELECT col_default_is(    'vehicle_size', 'created_at', 'now()');

  SELECT has_column(        'vehicle_size', 'updated_at');
  SELECT col_type_is(       'vehicle_size', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'vehicle_size', 'updated_at');
  SELECT col_hasnt_default( 'vehicle_size', 'updated_at');

  SELECT indexes_are(
    'api', 'vehicle_size', ARRAY[
      'vehicle_size_pkey'
    ]
  );

  SELECT has_index(
    'vehicle_size'
    , 'vehicle_size_pkey'::NAME
    , ARRAY['id']
  );

  SELECT triggers_are(
    'api', 'vehicle_size', ARRAY[
      'trg_vehicle_size_set_updated_at'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'vehicle_size'
    , 'trg_vehicle_size_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT finish();

ROLLBACK;

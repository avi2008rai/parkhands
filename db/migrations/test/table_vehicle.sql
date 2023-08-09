BEGIN;

  SELECT    plan(48);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('vehicle');
  SELECT has_pk('vehicle');
  SELECT columns_are(
    'vehicle',
    ARRAY[
      'id'
      , 'owner_id'
      , 'name'
      , 'license_plate'
      , 'vehicle_type_id'
      , 'vehicle_size_id'
      , 'status'
      , 'created_at'
      , 'updated_at'
    ]
  );

  SELECT has_column(        'vehicle', 'id');
  SELECT col_type_is(       'vehicle', 'id', 'uuid');
  SELECT col_default_is(    'vehicle', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'vehicle', 'id');

  SELECT has_column(        'vehicle', 'owner_id');
  SELECT col_type_is(       'vehicle', 'owner_id', 'uuid');
  SELECT col_not_null(      'vehicle', 'owner_id');
  SELECT col_default_is(    'vehicle', 'owner_id', 'request.user_id()');
  SELECT fk_ok(             'vehicle', 'owner_id', 'user', 'id');

  SELECT has_column(        'vehicle', 'name');
  SELECT col_type_is(       'vehicle', 'name', 'citext');
  SELECT col_hasnt_default( 'vehicle', 'name');
  SELECT col_not_null(      'vehicle', 'name');

  SELECT has_column(        'vehicle', 'license_plate');
  SELECT col_type_is(       'vehicle', 'license_plate', 'citext');
  SELECT col_hasnt_default( 'vehicle', 'license_plate');
  SELECT col_is_null(       'vehicle', 'license_plate');

  SELECT has_column(        'vehicle', 'vehicle_type_id');
  SELECT col_type_is(       'vehicle', 'vehicle_type_id', 'uuid');
  SELECT col_hasnt_default( 'vehicle', 'vehicle_type_id');
  SELECT col_not_null(      'vehicle', 'vehicle_type_id');
  SELECT fk_ok(             'vehicle', 'vehicle_type_id', 'vehicle_type', 'id');

  SELECT has_column(        'vehicle', 'vehicle_size_id');
  SELECT col_type_is(       'vehicle', 'vehicle_size_id', 'uuid');
  SELECT col_hasnt_default( 'vehicle', 'vehicle_size_id');
  SELECT col_not_null(      'vehicle', 'vehicle_size_id');
  SELECT fk_ok(             'vehicle', 'vehicle_size_id', 'vehicle_size', 'id');

  SELECT has_column(        'vehicle', 'status');
  SELECT col_type_is(       'vehicle', 'status', 'status_t');
  SELECT col_not_null(      'vehicle', 'status');
  SELECT col_has_default(   'vehicle', 'status');
  SELECT col_default_is(    'vehicle', 'status', 'enabled');

  SELECT has_column(        'vehicle', 'created_at');
  SELECT col_type_is(       'vehicle', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'vehicle', 'created_at');
  SELECT col_has_default(   'vehicle', 'created_at');
  SELECT col_default_is(    'vehicle', 'created_at', 'now()');

  SELECT has_column(        'vehicle', 'updated_at');
  SELECT col_type_is(       'vehicle', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'vehicle', 'updated_at');
  SELECT col_hasnt_default( 'vehicle', 'updated_at');

  SELECT indexes_are('vehicle', ARRAY[ 'vehicle_pkey' ]);

  SELECT has_index(
    'vehicle',
    'vehicle_pkey'::NAME,
    ARRAY['id']
  );

  SELECT triggers_are(
    'api', 'vehicle', ARRAY[
      'trg_vehicle_set_updated_at'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'vehicle'
    , 'trg_vehicle_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT    finish();

ROLLBACK;

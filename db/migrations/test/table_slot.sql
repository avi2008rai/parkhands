BEGIN;

  SELECT plan(100);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('slot');
  SELECT has_pk('slot');
  SELECT columns_are(
    'slot',
    ARRAY[
      'id'
      , 'name'
      , 'owner_id'
      , 'parking_space_id'
      , 'vehicle_size_id'
      , 'address'
      , 'timezone'
      , 'price_per_hour'
      , 'status'
      , 'verification_status'
      , 'photo_url'
      , 'description'
      , 'notes'
      , 'location'
      , 'slug'
      , 'created_at'
      , 'updated_at'
      , 'deleted_at'
      , 'deleted'
      , 'shape'
      , 'access_restrictions'
      , 'business_status'
      , 'business_status_reason'
      , 'category'
      , 'contributor_id'
      , 'level'
      , 'map_source'
      , 'slot_dimensions'
      , 'temp_unavailable'
      , 'temp_unavailable_from'
      , 'temp_unavailable_to'
      , 'waypoints'
    ]
  );

  SELECT has_column(        'slot', 'id');
  SELECT col_type_is(       'slot', 'id', 'uuid');
  SELECT col_default_is(    'slot', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'slot', 'id');

  SELECT has_column(        'slot', 'name');
  SELECT col_type_is(       'slot', 'name', 'text');
  SELECT col_hasnt_default( 'slot', 'name');
  SELECT col_not_null(      'slot', 'name');

  SELECT has_column(        'slot', 'owner_id');
  SELECT col_type_is(       'slot', 'owner_id', 'uuid');
  SELECT col_not_null(      'slot', 'owner_id');
  SELECT col_has_default(   'slot', 'owner_id');
  SELECT col_default_is(    'slot', 'owner_id', 'request.user_id()');
  SELECT fk_ok(             'slot', 'owner_id', 'user', 'id');

  SELECT has_column(        'slot', 'parking_space_id');
  SELECT col_type_is(       'slot', 'parking_space_id', 'uuid');
  SELECT col_is_null(       'slot', 'parking_space_id');
  SELECT col_hasnt_default( 'slot', 'parking_space_id');
  SELECT fk_ok(             'slot', 'parking_space_id', 'parking_space', 'id');

  SELECT has_column(        'slot', 'vehicle_size_id');
  SELECT col_type_is(       'slot', 'vehicle_size_id', 'uuid');
  SELECT col_not_null(      'slot', 'vehicle_size_id');
  SELECT col_hasnt_default( 'slot', 'vehicle_size_id');
  SELECT fk_ok(             'slot', 'vehicle_size_id', 'vehicle_size', 'id');

  SELECT has_column(        'slot', 'address');
  SELECT col_type_is(       'slot', 'address', 'json');
  SELECT col_hasnt_default( 'slot', 'address');
  SELECT col_is_null(       'slot', 'address');

  SELECT has_column(        'slot', 'timezone');
  SELECT col_type_is(       'slot', 'timezone', 'text');
  SELECT col_not_null(      'slot', 'timezone');
  SELECT col_has_default(   'slot', 'timezone');
  SELECT col_default_is(    'slot', 'timezone', 'Europe/Berlin');

  SELECT has_column(        'slot', 'price_per_hour');
  SELECT col_type_is(       'slot', 'price_per_hour', 'numeric');
  SELECT col_hasnt_default( 'slot', 'price_per_hour');
  SELECT col_not_null(      'slot', 'price_per_hour');

  SELECT has_column(        'slot', 'status');
  SELECT col_type_is(       'slot', 'status', 'slot_status_t');
  SELECT col_not_null(      'slot', 'status');
  SELECT col_has_default(   'slot', 'status');
  SELECT col_default_is(    'slot', 'status', 'enabled');

  SELECT has_column(        'slot', 'verification_status');
  SELECT col_type_is(       'slot', 'verification_status', 'slot_verification_status');
  SELECT col_not_null(      'slot', 'verification_status');
  SELECT col_has_default(   'slot', 'verification_status');
  SELECT col_default_is(    'slot', 'verification_status', 'verified');

  SELECT has_column(        'slot', 'photo_url');
  SELECT col_type_is(       'slot', 'photo_url', 'text');
  SELECT col_hasnt_default( 'slot', 'photo_url');
  SELECT col_is_null(       'slot', 'photo_url');

  SELECT has_column(        'slot', 'description');
  SELECT col_type_is(       'slot', 'description', 'text');
  SELECT col_hasnt_default( 'slot', 'description');
  SELECT col_is_null(       'slot', 'description');

  SELECT has_column(        'slot', 'notes');
  SELECT col_type_is(       'slot', 'notes', 'text');
  SELECT col_hasnt_default( 'slot', 'notes');
  SELECT col_is_null(       'slot', 'notes');

  SELECT has_column(        'slot', 'location');
  SELECT col_type_is(       'slot', 'location', 'geometry(Point,4326)');
  SELECT col_hasnt_default( 'slot', 'location');
  SELECT col_not_null(      'slot', 'location');

  SELECT has_column(        'slot', 'slug');
  SELECT col_type_is(       'slot', 'slug', 'text');
  SELECT col_is_null(       'slot', 'slug');
  SELECT col_hasnt_default( 'slot', 'slug');

  SELECT has_column(        'slot', 'created_at');
  SELECT col_type_is(       'slot', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'slot', 'created_at');
  SELECT col_has_default(   'slot', 'created_at');
  SELECT col_default_is(    'slot', 'created_at', 'now()');

  SELECT has_column(        'slot', 'updated_at');
  SELECT col_type_is(       'slot', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'slot', 'updated_at');
  SELECT col_hasnt_default( 'slot', 'updated_at');

  SELECT has_column(        'slot', 'deleted');
  SELECT col_type_is(       'slot', 'deleted', 'boolean');
  SELECT col_not_null(      'slot', 'deleted');
  SELECT col_has_default(   'slot', 'deleted');
  SELECT col_default_is(    'slot', 'deleted', 'false');

  SELECT has_column(        'slot', 'deleted_at');
  SELECT col_type_is(       'slot', 'deleted_at', 'timestamp with time zone');
  SELECT col_hasnt_default( 'slot', 'deleted_at');
  SELECT col_is_null(       'slot', 'deleted_at');

  SELECT has_column(        'slot', 'shape');
  SELECT col_type_is(       'slot', 'shape', 'geometry(Polygon,4326)');
  SELECT col_hasnt_default( 'slot', 'shape');
  SELECT col_is_null(       'slot', 'shape');

  SELECT indexes_are(
    'api', 'slot', ARRAY[
      'slot_pkey'
      , 'slot_slug_unique_idx'
      , 'slot_location_gix'
    ]
  );

  SELECT has_index(
    'slot'
    , 'slot_pkey'::NAME
    , ARRAY['id']
  );

  SELECT has_index(
    'slot'
    , 'slot_slug_unique_idx'::NAME
    , ARRAY['slug']
  );

  SELECT has_index(
    'slot'
    , 'slot_location_gix'::NAME
    , ARRAY['location']
  );

  SELECT triggers_are(
    'api', 'slot', ARRAY[
    'trg_slot_generate_slug_on_name'
      , 'trg_slot_set_updated_at'
      , 'trg_slot_soft_delete_record'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'slot'
    , 'trg_slot_generate_slug_on_name'
    , 'util'
    , 'generate_slug_on_name'
  );

  SELECT trigger_is(
    'api'
    , 'slot'
    , 'trg_slot_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT trigger_is(
    'api'
    , 'slot'
    , 'trg_slot_soft_delete_record'
    , 'util'
    , 'soft_delete_slot'
  );

  SELECT    finish();

ROLLBACK;

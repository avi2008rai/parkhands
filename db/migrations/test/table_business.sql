BEGIN;

  SELECT plan(57);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('business');
  SELECT has_pk('business');
  SELECT columns_are(
    'business',
    ARRAY[
      'id'
      , 'owner_id'
      , 'name'
      , 'description'
      , 'photo_url'
      , 'marker_url'
      , 'address'
      , 'location'
      , 'slug'
      , 'created_at'
      , 'updated_at'
    ]
  );

  SELECT has_column(        'business', 'id');
  SELECT col_type_is(       'business', 'id', 'uuid');
  SELECT col_default_is(    'business', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'business', 'id');

  SELECT has_column(        'business', 'owner_id');
  SELECT col_type_is(       'business', 'owner_id', 'uuid');
  SELECT col_not_null(      'business', 'owner_id');
  SELECT col_has_default(   'business', 'owner_id');
  SELECT col_default_is(    'business', 'owner_id', 'request.user_id()');
  SELECT fk_ok(             'business', 'owner_id', 'user', 'id');

  SELECT has_column(        'business', 'name');
  SELECT col_type_is(       'business', 'name', 'text');
  SELECT col_hasnt_default( 'business', 'name');
  SELECT col_not_null(      'business', 'name');

  SELECT has_column(        'business', 'description');
  SELECT col_type_is(       'business', 'description', 'text');
  SELECT col_hasnt_default( 'business', 'description');
  SELECT col_is_null(       'business', 'description');

  SELECT has_column(        'business', 'photo_url');
  SELECT col_type_is(       'business', 'photo_url', 'text');
  SELECT col_hasnt_default( 'business', 'photo_url');
  SELECT col_is_null(       'business', 'photo_url');

  SELECT has_column(        'business', 'marker_url');
  SELECT col_type_is(       'business', 'marker_url', 'text');
  SELECT col_hasnt_default( 'business', 'marker_url');
  SELECT col_is_null(       'business', 'marker_url');

  SELECT has_column(        'business', 'address');
  SELECT col_type_is(       'business', 'address', 'json');
  SELECT col_hasnt_default( 'business', 'address');
  SELECT col_is_null(       'business', 'address');

  SELECT has_column(        'business', 'location');
  SELECT col_type_is(       'business', 'location', 'geography(Point,4326)');
  SELECT col_hasnt_default( 'business', 'location');
  SELECT col_not_null(      'business', 'location');

  SELECT has_column(        'business', 'slug');
  SELECT col_type_is(       'business', 'slug', 'text');
  SELECT col_is_null(       'business', 'slug');
  SELECT col_hasnt_default( 'business', 'slug');

  SELECT has_column(        'business', 'created_at');
  SELECT col_type_is(       'business', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'business', 'created_at');
  SELECT col_has_default(   'business', 'created_at');
  SELECT col_default_is(    'business', 'created_at', 'now()');

  SELECT has_column(        'business', 'updated_at');
  SELECT col_type_is(       'business', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'business', 'updated_at');
  SELECT col_hasnt_default( 'business', 'updated_at');

  SELECT indexes_are(
    'api', 'business', ARRAY[
      'business_pkey'
      , 'business_slug_ukey'
      , 'business_location_gix'
    ]
  );

  SELECT has_index(
    'business'
    , 'business_pkey'::NAME
    , ARRAY['id']
  );

  SELECT has_index(
    'business'
    , 'business_slug_ukey'::NAME
    , ARRAY['slug']
  );

  SELECT has_index(
    'business'
    , 'business_location_gix'::NAME
    , ARRAY['location']
  );

  SELECT triggers_are(
    'api', 'business', ARRAY[
      'trg_business_generate_slug_on_name'
      , 'trg_business_set_updated_at'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'business'
    , 'trg_business_generate_slug_on_name'
    , 'util'
    , 'generate_slug_on_name'
  );

  SELECT trigger_is(
    'api'
    , 'business'
    , 'trg_business_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT    finish();

ROLLBACK;

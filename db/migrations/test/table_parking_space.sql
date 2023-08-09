BEGIN;

  SELECT plan(144);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('parking_space');
  SELECT has_pk('parking_space');
  SELECT columns_are(
    'parking_space',
    ARRAY[
      'id'
      , 'owner_id'
      , 'name'
      , 'description'
      , 'photo_url'
      , 'settings'
      , 'address'
      , 'location'
      , 'slug'
      , 'created_at'
      , 'updated_at'
      , 'access_restriction'
      , 'advt_link'
      , 'blue_print'
      , 'brand_logo'
      , 'car_entry'
      , 'car_exit'
      , 'category'
      , 'company_entrance'
      , 'contributor_id'
      , 'floor'
      , 'hidden_field'
      , 'language_code'
      , 'parkingspace_mapview'
      , 'pedestrian_text'
      , 'status'
      , 'verification_status'
      , 'working_hours'
      , 'deleted_at'
      , 'deleted'
      , 'business_status_reason'
    ]
  );

  SELECT has_column(        'parking_space', 'id');
  SELECT col_type_is(       'parking_space', 'id', 'uuid');
  SELECT col_default_is(    'parking_space', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'parking_space', 'id');

  SELECT has_column(        'parking_space', 'owner_id');
  SELECT col_type_is(       'parking_space', 'owner_id', 'uuid');
  SELECT col_not_null(      'parking_space', 'owner_id');
  SELECT col_has_default(   'parking_space', 'owner_id');
  SELECT col_default_is(    'parking_space', 'owner_id', 'request.user_id()');
  SELECT fk_ok(             'parking_space', 'owner_id', 'user', 'id');

  SELECT has_column(        'parking_space', 'name');
  SELECT col_type_is(       'parking_space', 'name', 'text');
  SELECT col_hasnt_default( 'parking_space', 'name');
  SELECT col_not_null(      'parking_space', 'name');

  SELECT has_column(        'parking_space', 'description');
  SELECT col_type_is(       'parking_space', 'description', 'text');
  SELECT col_hasnt_default( 'parking_space', 'description');
  SELECT col_is_null(       'parking_space', 'description');

  SELECT has_column(        'parking_space', 'photo_url');
  SELECT col_type_is(       'parking_space', 'photo_url', 'text');
  SELECT col_hasnt_default( 'parking_space', 'photo_url');
  SELECT col_is_null(       'parking_space', 'photo_url');

  SELECT has_column(        'parking_space', 'address');
  SELECT col_type_is(       'parking_space', 'address', 'json');
  SELECT col_hasnt_default( 'parking_space', 'address');
  SELECT col_is_null(       'parking_space', 'address');

  SELECT has_column(        'parking_space', 'settings');
  SELECT col_type_is(       'parking_space', 'settings', 'json');
  SELECT col_hasnt_default( 'parking_space', 'settings');
  SELECT col_is_null(       'parking_space', 'settings');

  SELECT has_column(        'parking_space', 'location');
  SELECT col_type_is(       'parking_space', 'location', 'geography(Point,4326)');
  SELECT col_hasnt_default( 'parking_space', 'location');
  SELECT col_is_null(       'parking_space', 'location');

  SELECT has_column(        'parking_space', 'slug');
  SELECT col_type_is(       'parking_space', 'slug', 'text');
  SELECT col_is_null(       'parking_space', 'slug');
  SELECT col_hasnt_default( 'parking_space', 'slug');

  SELECT has_column(        'parking_space', 'created_at');
  SELECT col_type_is(       'parking_space', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'parking_space', 'created_at');
  SELECT col_has_default(   'parking_space', 'created_at');
  SELECT col_default_is(    'parking_space', 'created_at', 'now()');

  SELECT has_column(        'parking_space', 'updated_at');
  SELECT col_type_is(       'parking_space', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'parking_space', 'updated_at');
  SELECT col_hasnt_default( 'parking_space', 'updated_at');

  SELECT has_column(        'parking_space', 'access_restriction');
  SELECT col_type_is(       'parking_space', 'access_restriction', 'space_access_restriction[]');
  SELECT col_is_null(       'parking_space', 'access_restriction');
  SELECT col_has_default(   'parking_space', 'access_restriction');
  SELECT col_default_is(    'parking_space', 'access_restriction', '{none}');

  SELECT has_column(        'parking_space', 'advt_link');
  SELECT col_type_is(       'parking_space', 'advt_link', 'text');
  SELECT col_is_null(       'parking_space', 'advt_link');
  SELECT col_hasnt_default( 'parking_space', 'advt_link');

  SELECT has_column(        'parking_space', 'blue_print');
  SELECT col_type_is(       'parking_space', 'blue_print', 'text');
  SELECT col_is_null(       'parking_space', 'blue_print');
  SELECT col_hasnt_default( 'parking_space', 'blue_print');

  SELECT has_column(        'parking_space', 'brand_logo');
  SELECT col_type_is(       'parking_space', 'brand_logo', 'text');
  SELECT col_is_null(       'parking_space', 'brand_logo');
  SELECT col_hasnt_default( 'parking_space', 'brand_logo');

  SELECT has_column(        'parking_space', 'car_entry');
  SELECT col_type_is(       'parking_space', 'car_entry', 'geometry(Point,4326)');
  SELECT col_is_null(       'parking_space', 'car_entry');
  SELECT col_hasnt_default( 'parking_space', 'car_entry');

  SELECT has_column(        'parking_space', 'car_exit');
  SELECT col_type_is(       'parking_space', 'car_exit', 'geometry(Point,4326)');
  SELECT col_is_null(       'parking_space', 'car_exit');
  SELECT col_hasnt_default( 'parking_space', 'car_exit');

  SELECT has_column(        'parking_space', 'category');
  SELECT col_type_is(       'parking_space', 'category', 'space_category');
  SELECT col_is_null(       'parking_space', 'category');
  SELECT col_has_default(   'parking_space', 'category');
  SELECT col_default_is(    'parking_space', 'category', 'private');

  SELECT has_column(        'parking_space', 'company_entrance');
  SELECT col_type_is(       'parking_space', 'company_entrance', 'geometry(Point,4326)');
  SELECT col_is_null(       'parking_space', 'company_entrance');
  SELECT col_hasnt_default( 'parking_space', 'company_entrance');

  SELECT has_column(        'parking_space', 'contributor_id');
  SELECT col_type_is(       'parking_space', 'contributor_id', 'uuid');
  SELECT col_is_null(       'parking_space', 'contributor_id');
  SELECT col_hasnt_default( 'parking_space', 'contributor_id');

  SELECT has_column(        'parking_space', 'floor');
  SELECT col_type_is(       'parking_space', 'floor', 'smallint');
  SELECT col_is_null(       'parking_space', 'floor');
  SELECT col_has_default(   'parking_space', 'floor');
  SELECT col_default_is(    'parking_space', 'floor', 1);

  SELECT has_column(        'parking_space', 'hidden_field');
  SELECT col_type_is(       'parking_space', 'hidden_field', 'text');
  SELECT col_is_null(       'parking_space', 'hidden_field');
  SELECT col_hasnt_default( 'parking_space', 'hidden_field');

  SELECT has_column(        'parking_space', 'language_code');
  SELECT col_type_is(       'parking_space', 'language_code', 'character varying(2)');
  SELECT col_is_null(       'parking_space', 'language_code');
  SELECT col_hasnt_default( 'parking_space', 'language_code');

  SELECT has_column(        'parking_space', 'parkingspace_mapview');
  SELECT col_type_is(       'parking_space', 'parkingspace_mapview', 'geography(Polygon,4326)');
  SELECT col_is_null(       'parking_space', 'parkingspace_mapview');
  SELECT col_hasnt_default( 'parking_space', 'parkingspace_mapview');

  SELECT has_column(        'parking_space', 'pedestrian_text');
  SELECT col_type_is(       'parking_space', 'pedestrian_text', 'text');
  SELECT col_is_null(       'parking_space', 'pedestrian_text');
  SELECT col_hasnt_default( 'parking_space', 'pedestrian_text');

  SELECT has_column(        'parking_space', 'status');
  SELECT col_type_is(       'parking_space', 'status', 'parking_space_status');
  SELECT col_is_null(       'parking_space', 'status');
  SELECT col_has_default(   'parking_space', 'status');
  SELECT col_default_is(    'parking_space', 'status', 'enabled');

  SELECT has_column(        'parking_space', 'verification_status');
  SELECT col_type_is(       'parking_space', 'verification_status', 'space_verification_status');
  SELECT col_is_null(       'parking_space', 'verification_status');
  SELECT col_has_default(   'parking_space', 'verification_status');
  SELECT col_default_is(    'parking_space', 'verification_status', 'verified');

  SELECT has_column(        'parking_space', 'working_hours');
  SELECT col_type_is(       'parking_space', 'working_hours', 'json');
  SELECT col_is_null(       'parking_space', 'working_hours');
  SELECT col_hasnt_default( 'parking_space', 'working_hours');

  SELECT has_column(        'slot', 'deleted_at');
  SELECT col_type_is(       'slot', 'deleted_at', 'timestamp with time zone');
  SELECT col_hasnt_default( 'slot', 'deleted_at');
  SELECT col_is_null(       'slot', 'deleted_at');

  SELECT has_column(        'slot', 'deleted');
  SELECT col_type_is(       'slot', 'deleted', 'boolean');
  SELECT col_not_null(      'slot', 'deleted');
  SELECT col_has_default(   'slot', 'deleted');
  SELECT col_default_is(    'slot', 'deleted', 'false');

  SELECT has_column(        'parking_space', 'business_status_reason');
  SELECT col_type_is(       'parking_space', 'business_status_reason', 'text');
  SELECT col_hasnt_default( 'parking_space', 'business_status_reason');
  SELECT col_is_null(       'parking_space', 'business_status_reason');

  SELECT indexes_are(
    'api', 'parking_space', ARRAY[
      'parking_space_pkey'
      , 'parking_space_slug_ukey'
      , 'parking_space_location_gix'
    ]
  );

  SELECT has_index(
    'parking_space'
    , 'parking_space_pkey'::NAME
    , ARRAY['id']
  );

  SELECT has_index(
    'parking_space'
    , 'parking_space_slug_ukey'::NAME
    , ARRAY['slug']
  );

  SELECT has_index(
    'parking_space'
    , 'parking_space_location_gix'::NAME
    , ARRAY['location']
  );

  SELECT triggers_are(
    'api', 'parking_space', ARRAY[
      'trg_parking_space_generate_slug_on_name'
      , 'trg_parking_space_set_updated_at'
      , 'trg_space_soft_delete_record'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'parking_space'
    , 'trg_parking_space_generate_slug_on_name'
    , 'util'
    , 'generate_slug_on_name'
  );

  SELECT trigger_is(
    'api'
    , 'parking_space'
    , 'trg_parking_space_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT trigger_is(
    'api'
    , 'parking_space'
    , 'trg_space_soft_delete_record'
    , 'util'
    , 'soft_delete_space'
  );

  SELECT    finish();

ROLLBACK;

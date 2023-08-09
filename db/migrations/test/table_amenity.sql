BEGIN;

  SELECT plan(43);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('amenity');
  SELECT has_pk('amenity');
  SELECT columns_are(
    'amenity',
    ARRAY[
      'id'
      , 'name'
      , 'weight'
      , 'description'
      , 'status'
      , 'slug'
      , 'created_at'
      , 'updated_at'
    ]
  );

  SELECT has_column(        'amenity', 'id');
  SELECT col_type_is(       'amenity', 'id', 'uuid');
  SELECT col_default_is(    'amenity', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'amenity', 'id');

  SELECT has_column(        'amenity', 'name');
  SELECT col_type_is(       'amenity', 'name', 'citext');
  SELECT col_hasnt_default( 'amenity', 'name');
  SELECT col_not_null(      'amenity', 'name');

  SELECT has_column(        'amenity', 'weight');
  SELECT col_type_is(       'amenity', 'weight', 'integer');
  SELECT col_hasnt_default( 'amenity', 'weight');
  SELECT col_is_null(       'amenity', 'weight');

  SELECT has_column(        'amenity', 'description');
  SELECT col_type_is(       'amenity', 'description', 'text');
  SELECT col_hasnt_default( 'amenity', 'description');
  SELECT col_is_null(       'amenity', 'description');

  SELECT has_column(        'amenity', 'status');
  SELECT col_type_is(       'amenity', 'status', 'content_status_t');
  SELECT col_not_null(      'amenity', 'status');
  SELECT col_has_default(   'amenity', 'status');
  SELECT col_default_is(    'amenity', 'status', 'published');


  SELECT has_column(        'amenity', 'slug');
  SELECT col_type_is(       'amenity', 'slug', 'text');
  SELECT col_hasnt_default( 'amenity', 'slug');
  SELECT col_is_null(       'amenity', 'slug');

  SELECT has_column(        'amenity', 'created_at');
  SELECT col_type_is(       'amenity', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'amenity', 'created_at');
  SELECT col_has_default(   'amenity', 'created_at');
  SELECT col_default_is(    'amenity', 'created_at', 'now()');

  SELECT has_column(        'amenity', 'updated_at');
  SELECT col_type_is(       'amenity', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'amenity', 'updated_at');
  SELECT col_hasnt_default( 'amenity', 'updated_at');

  SELECT indexes_are(
    'api', 'amenity', ARRAY[
      'amenity_pkey'
      , 'amenity_name_unique_idx'
    ]
  );

  SELECT has_index(
    'amenity'
    , 'amenity_pkey'::NAME
    , ARRAY['id']
  );

  SELECT has_index(
    'amenity'
    , 'amenity_name_unique_idx'::NAME
    , ARRAY['name']
  );

  SELECT triggers_are(
    'api', 'amenity', ARRAY[
      'trg_amenity_set_updated_at'
      , 'trg_amenity_generate_slug_on_name'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'amenity'
    , 'trg_amenity_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );


  SELECT trigger_is(
    'api'
    , 'amenity'
    , 'trg_amenity_generate_slug_on_name'
    , 'util'
    , 'generate_slug_on_name'
  );

  SELECT    finish();
ROLLBACK;

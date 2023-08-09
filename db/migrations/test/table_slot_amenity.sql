BEGIN;

  SELECT plan(19);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('slot_amenity');
  SELECT has_pk('slot_amenity');
  SELECT columns_are(
    'slot_amenity',
    ARRAY[
      'id'
      , 'slot_id'
      ,'amenity_id'
    ]
  );
  SELECT has_column(        'slot_amenity', 'id');
  SELECT col_type_is(       'slot_amenity', 'id', 'uuid');
  SELECT col_default_is(    'slot_amenity', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'slot_amenity', 'id');

  SELECT has_column(        'slot_amenity', 'slot_id');
  SELECT col_type_is(       'slot_amenity', 'slot_id', 'uuid');
  SELECT col_hasnt_default( 'slot_amenity', 'slot_id');
  SELECT col_not_null(      'slot_amenity', 'slot_id');
  SELECT fk_ok(             'slot_amenity', 'slot_id', 'slot', 'id');

  SELECT has_column(        'slot_amenity', 'amenity_id');
  SELECT col_type_is(       'slot_amenity', 'amenity_id', 'uuid');
  SELECT col_hasnt_default( 'slot_amenity', 'amenity_id');
  SELECT col_not_null(      'slot_amenity', 'amenity_id');
  SELECT fk_ok(             'slot_amenity', 'amenity_id', 'amenity', 'id');

  SELECT indexes_are(
    'slot_amenity',
    ARRAY[
      'slot_amenity_pkey'
    ]
  );

  SELECT has_index(
    'slot_amenity',
    'slot_amenity_pkey'::NAME,
    ARRAY['id']
  );

  SELECT finish();

ROLLBACK;

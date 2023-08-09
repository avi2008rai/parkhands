BEGIN;
  
  SELECT plan(39);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('parking_space_availability');
  SELECT has_pk('parking_space_availability');
  SELECT columns_are(
    'parking_space_availability',
    ARRAY[
      'id'
    , 'parking_space_id'
    , 'from_date'
    , 'to_date'
    , 'default_flag'
    , 'closed_flag'
    , 'created_at'
    , 'updated_at'
    ]
  );

  SELECT has_column(        'parking_space_availability', 'id');
  SELECT col_type_is(       'parking_space_availability', 'id', 'uuid');
  SELECT col_default_is(    'parking_space_availability', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'parking_space_availability', 'id');

  SELECT has_column(        'parking_space_availability', 'parking_space_id');
  SELECT col_type_is(       'parking_space_availability', 'parking_space_id', 'uuid');
  SELECT col_not_null(      'parking_space_availability', 'parking_space_id');
  SELECT col_hasnt_default(   'parking_space_availability', 'parking_space_id');
  SELECT fk_ok(             'parking_space_availability', 'parking_space_id', 'parking_space', 'id');

  SELECT has_column(        'parking_space_availability', 'from_date');
  SELECT col_type_is(       'parking_space_availability', 'from_date', 'date');
  SELECT col_hasnt_default( 'parking_space_availability', 'from_date');
  SELECT col_not_null(      'parking_space_availability', 'from_date');

  SELECT has_column(        'parking_space_availability', 'to_date');
  SELECT col_type_is(       'parking_space_availability', 'to_date', 'date');
  SELECT col_hasnt_default(   'parking_space_availability', 'to_date');
  SELECT col_not_null(      'parking_space_availability', 'to_date');

  SELECT has_column(        'parking_space_availability', 'default_flag');
  SELECT col_type_is(       'parking_space_availability', 'default_flag', 'boolean');
  SELECT col_has_default(   'parking_space_availability', 'default_flag');
  SELECT col_not_null(      'parking_space_availability', 'default_flag');
  SELECT col_default_is(    'parking_space_availability', 'default_flag', 'false');

  SELECT has_column(        'parking_space_availability', 'closed_flag');
  SELECT col_type_is(       'parking_space_availability', 'closed_flag', 'boolean');
  SELECT col_has_default(   'parking_space_availability', 'closed_flag');
  SELECT col_not_null(      'parking_space_availability', 'closed_flag');
  SELECT col_default_is(    'parking_space_availability', 'closed_flag', 'false');

  SELECT has_column(        'parking_space_availability', 'created_at');
  SELECT col_type_is(       'parking_space_availability', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'parking_space_availability', 'created_at');
  SELECT col_has_default(   'parking_space_availability', 'created_at');
  SELECT col_default_is(    'parking_space_availability', 'created_at', 'now()');

  SELECT has_column(        'parking_space_availability', 'updated_at');
  SELECT col_type_is(       'parking_space_availability', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'parking_space_availability', 'updated_at');
  SELECT col_hasnt_default( 'parking_space_availability', 'updated_at');

  SELECT    finish();

  ROLLBACK;
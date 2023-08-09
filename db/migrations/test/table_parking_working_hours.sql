BEGIN;
  
  SELECT plan(33);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('parking_working_hours');
  SELECT has_pk('parking_working_hours');
  SELECT columns_are(
    'parking_working_hours',
    ARRAY[
      'id'
    , 'parking_space_availability_id'
    , 'day_of_week'
    , 'from_time'
    , 'to_time'
    , 'created_at'
    , 'updated_at'
    ]
  );

  SELECT has_column(        'parking_working_hours', 'id');
  SELECT col_type_is(       'parking_working_hours', 'id', 'uuid');
  SELECT col_default_is(    'parking_working_hours', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'parking_working_hours', 'id');

  SELECT has_column(        'parking_working_hours', 'parking_space_availability_id');
  SELECT col_type_is(       'parking_working_hours', 'parking_space_availability_id', 'uuid');
  SELECT col_not_null(      'parking_working_hours', 'parking_space_availability_id');
  SELECT col_hasnt_default( 'parking_working_hours', 'parking_space_availability_id');
  SELECT fk_ok(             'parking_working_hours', 'parking_space_availability_id', 'parking_space_availability', 'id');

  SELECT has_column(        'parking_working_hours', 'from_time');
  SELECT col_type_is(       'parking_working_hours', 'from_time', 'time without time zone');
  SELECT col_hasnt_default( 'parking_working_hours', 'from_time');
  SELECT col_not_null(      'parking_working_hours', 'from_time');

  SELECT has_column(        'parking_working_hours', 'to_time');
  SELECT col_type_is(       'parking_working_hours', 'to_time', 'time without time zone');
  SELECT col_hasnt_default(   'parking_working_hours', 'to_time');
  SELECT col_not_null(      'parking_working_hours', 'to_time');

  SELECT has_column(        'parking_working_hours', 'day_of_week');
  SELECT col_type_is(       'parking_working_hours', 'day_of_week', 'json');
  SELECT col_hasnt_default(   'parking_working_hours', 'day_of_week');
  SELECT col_not_null(      'parking_working_hours', 'day_of_week');
  
  SELECT has_column(        'parking_working_hours', 'created_at');
  SELECT col_type_is(       'parking_working_hours', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'parking_working_hours', 'created_at');
  SELECT col_has_default(   'parking_working_hours', 'created_at');
  SELECT col_default_is(    'parking_working_hours', 'created_at', 'now()');

  SELECT has_column(        'parking_working_hours', 'updated_at');
  SELECT col_type_is(       'parking_working_hours', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'parking_working_hours', 'updated_at');
  SELECT col_hasnt_default( 'parking_working_hours', 'updated_at');

  SELECT    finish();

  ROLLBACK;
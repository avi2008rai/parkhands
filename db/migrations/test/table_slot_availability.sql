BEGIN;

  SELECT plan(31);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('slot_availability');
  SELECT has_pk('slot_availability');
  SELECT columns_are(
    'slot_availability',
    ARRAY[
      'id'
      , 'slot_id'
      , 'day_of_week'
      , 'start_hour'
      , 'end_hour'
      , 'created_at'
      , 'cancel_charge'
      , 'tariff_currency'
      , 'tariff_per_hour'
    ]
  );

  SELECT has_column(        'slot_availability', 'id');
  SELECT col_type_is(       'slot_availability', 'id', 'uuid');
  SELECT col_default_is(    'slot_availability', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'slot_availability', 'id');

  SELECT has_column(        'slot_availability', 'slot_id');
  SELECT col_type_is(       'slot_availability', 'slot_id', 'uuid');
  SELECT col_not_null(      'slot_availability', 'slot_id');
  SELECT col_hasnt_default( 'slot_availability', 'slot_id');
  SELECT fk_ok(             'slot_availability', 'slot_id', 'slot', 'id');

  SELECT has_column(        'slot_availability', 'day_of_week');
  SELECT col_type_is(       'slot_availability', 'day_of_week', 'integer');
  SELECT col_hasnt_default( 'slot_availability', 'day_of_week');
  SELECT col_not_null(      'slot_availability', 'day_of_week');

  SELECT has_column(        'slot_availability', 'start_hour');
  SELECT col_type_is(       'slot_availability', 'start_hour', 'time without time zone');
  SELECT col_not_null(      'slot_availability', 'start_hour');
  SELECT col_hasnt_default( 'slot_availability', 'start_hour');

  SELECT has_column(        'slot_availability', 'end_hour');
  SELECT col_type_is(       'slot_availability', 'end_hour', 'time without time zone');
  SELECT col_not_null(      'slot_availability', 'end_hour');
  SELECT col_hasnt_default( 'slot_availability', 'end_hour');

  SELECT has_column(        'slot_availability', 'created_at');
  SELECT col_type_is(       'slot_availability', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'slot_availability', 'created_at');
  SELECT col_has_default(   'slot_availability', 'created_at');
  SELECT col_default_is(    'slot_availability', 'created_at', 'now()');

  SELECT indexes_are(
    'api', 'slot_availability', ARRAY[
      'slot_availability_pkey'
    ]
  );

  SELECT has_index(
    'slot_availability'
    , 'slot_availability_pkey'::NAME
    , ARRAY['id']
  );

  SELECT    finish();

ROLLBACK;

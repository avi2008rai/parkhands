BEGIN;

  SELECT plan(61);

  SET SEARCH_PATH TO timescale, public;

  SELECT has_table('slot_booking');
  SELECT has_pk('slot_booking');
  SELECT columns_are(
    'slot_booking',
    ARRAY[
      'id'
      , 'slot_id'
      , 'user_id'
      , 'status'
      , 'license_plate'
      , 'start_time'
      , 'end_time'
      , 'created_at'
      , 'phone'
      , 'check_in_at'
      , 'check_out_at'
      , 'payment_receipt_id'
    ]
  );

  SELECT has_column(        'slot_booking', 'id');
  SELECT col_type_is(       'slot_booking', 'id', 'uuid');
  SELECT col_default_is(    'slot_booking', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'slot_booking', 'id');

  SELECT has_column(        'slot_booking', 'slot_id');
  SELECT col_type_is(       'slot_booking', 'slot_id', 'uuid');
  SELECT col_not_null(      'slot_booking', 'slot_id');
  SELECT col_hasnt_default( 'slot_booking', 'slot_id');
  SELECT fk_ok(             'slot_booking', 'slot_id', 'slot', 'id');

  SELECT has_column(        'slot_booking', 'user_id');
  SELECT col_type_is(       'slot_booking', 'user_id', 'uuid');
  SELECT col_not_null(      'slot_booking', 'user_id');
  SELECT col_hasnt_default( 'slot_booking', 'user_id');
  SELECT fk_ok(             'slot_booking', 'user_id', 'user', 'id');

  SELECT has_column(        'slot_booking', 'status');
  SELECT col_type_is(       'slot_booking', 'status', 'booking_status_t');
  SELECT col_not_null(      'slot_booking', 'status');
  SELECT col_has_default(   'slot_booking', 'status');
  SELECT col_default_is(    'slot_booking', 'status', 'pending');

  SELECT has_column(        'slot_booking', 'license_plate');
  SELECT col_type_is(       'slot_booking', 'license_plate', 'citext');
  SELECT col_hasnt_default( 'slot_booking', 'license_plate');
  SELECT col_is_null(       'slot_booking', 'license_plate');

  SELECT has_column(        'slot_booking', 'start_time');
  SELECT col_type_is(       'slot_booking', 'start_time', 'timestamp with time zone');
  SELECT col_not_null(      'slot_booking', 'start_time');
  SELECT col_has_default(   'slot_booking', 'start_time');
  SELECT col_default_is(    'slot_booking', 'start_time', 'now()');

  SELECT has_column(        'slot_booking', 'end_time');
  SELECT col_type_is(       'slot_booking', 'end_time', 'timestamp with time zone');
  SELECT col_not_null(      'slot_booking', 'end_time');
  SELECT col_hasnt_default( 'slot_booking', 'end_time');

  SELECT has_column(        'slot_booking', 'created_at');
  SELECT col_type_is(       'slot_booking', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'slot_booking', 'created_at');
  SELECT col_has_default(   'slot_booking', 'created_at');
  SELECT col_default_is(    'slot_booking', 'created_at', 'now()');

  SELECT has_column(        'slot_booking', 'phone');
  SELECT col_type_is(       'slot_booking', 'phone', 'phone_us');
  SELECT col_is_null(       'slot_booking', 'phone');
  SELECT col_hasnt_default( 'slot_booking', 'phone');

  SELECT has_column(        'slot_booking', 'check_in_at');
  SELECT col_type_is(       'slot_booking', 'check_in_at', 'timestamp with time zone');
  SELECT col_is_null(       'slot_booking', 'check_in_at');
  SELECT col_hasnt_default( 'slot_booking', 'check_in_at');

  SELECT has_column(        'slot_booking', 'check_out_at');
  SELECT col_type_is(       'slot_booking', 'check_out_at', 'timestamp with time zone');
  SELECT col_is_null(       'slot_booking', 'check_out_at');
  SELECT col_hasnt_default( 'slot_booking', 'check_out_at');

  SELECT has_column(        'slot_booking', 'payment_receipt_id');
  SELECT col_type_is(       'slot_booking', 'payment_receipt_id', 'uuid');
  SELECT col_is_null(       'slot_booking', 'payment_receipt_id');
  SELECT col_hasnt_default( 'slot_booking', 'payment_receipt_id');
  SELECT fk_ok(             'slot_booking', 'payment_receipt_id', 'payment_receipt', 'id');

  SELECT indexes_are(
    'timescale', 'slot_booking', ARRAY[
      'slot_booking_pkey'
      , 'slot_booking_start_time_idx'
      , 'no_overlapping_timestamps'
    ]
  );

  SELECT has_index(
    'slot_booking'
    , 'slot_booking_pkey'::NAME
    , ARRAY['id', 'start_time']
  );

  SELECT has_index(
    'slot_booking'
    , 'slot_booking_start_time_idx'::NAME
    , ARRAY['start_time']
  );

  SELECT has_index(
    'slot_booking'
    , 'no_overlapping_timestamps'::NAME
    , ARRAY['slot_id', 'start_time', 'tstzrange(start_time, end_time)']
  );

  SELECT    finish();

ROLLBACK;

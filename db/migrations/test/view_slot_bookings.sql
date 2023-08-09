BEGIN;

  SELECT plan(28);

  SET SEARCH_PATH TO api, PUBLIC;

  SELECT has_view('slot_bookings');
  SELECT columns_are(
    'slot_bookings',
    ARRAY[
      'id'
      , 'slot_id'
      , 'user_id'
      , 'status'
      , 'license_plate'
      , 'phone'
      , 'start_time'
      , 'end_time'
      , 'created_at'
      , 'check_in_at'
      , 'check_out_at'
      , 'payment_receipt_id'
      ]
  );

  SELECT has_column(  'slot_bookings', 'id');
  SELECT col_type_is( 'slot_bookings', 'id', 'uuid');

  SELECT has_column(  'slot_bookings', 'slot_id');
  SELECT col_type_is( 'slot_bookings', 'slot_id', 'uuid');

  SELECT has_column(  'slot_bookings', 'user_id');
  SELECT col_type_is( 'slot_bookings', 'user_id', 'uuid');

  SELECT has_column(  'slot_bookings', 'status');
  SELECT col_type_is( 'slot_bookings', 'status', 'booking_status_t');

  SELECT has_column(  'slot_bookings', 'license_plate');
  SELECT col_type_is( 'slot_bookings', 'license_plate', 'citext');

  SELECT has_column(  'slot_bookings', 'start_time');
  SELECT col_type_is( 'slot_bookings', 'start_time', 'timestamp with time zone');

  SELECT has_column(  'slot_bookings', 'end_time');
  SELECT col_type_is( 'slot_bookings', 'end_time', 'timestamp with time zone');

  SELECT has_column(  'slot_bookings', 'created_at');
  SELECT col_type_is( 'slot_bookings', 'created_at', 'timestamp with time zone');

  SELECT has_column(  'slot_bookings', 'phone');
  SELECT col_type_is( 'slot_bookings', 'phone', 'phone_us');

  SELECT has_column(  'slot_bookings', 'check_in_at');
  SELECT col_type_is( 'slot_bookings', 'check_in_at', 'timestamp with time zone');

  SELECT has_column(  'slot_bookings', 'check_out_at');
  SELECT col_type_is( 'slot_bookings', 'check_out_at', 'timestamp with time zone');

  SELECT has_column(  'slot_bookings', 'payment_receipt_id');
  SELECT col_type_is( 'slot_bookings', 'payment_receipt_id', 'uuid');

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_bookings'::NAME
    , 'public'::NAME
    , '{}'
  );

  SELECT table_privs_are(
    'api'::NAME
    , 'slot_bookings'::NAME
    , 'base_single'::NAME
    , ARRAY['SELECT']
  );

  SELECT finish();

ROLLBACK;

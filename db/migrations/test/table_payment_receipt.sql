BEGIN;

  SELECT plan(35);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('payment_receipt');
  SELECT has_pk('payment_receipt');
  SELECT columns_are(
    'payment_receipt',
    ARRAY[
      'id'
      , 'owner_id'
      , 'payment_intent_id'
      , 'receipt_url'
      , 'amount'
      , 'created_at'
      , 'updated_at'
      ]
  );

  SELECT has_column(        'payment_receipt', 'id');
  SELECT col_type_is(       'payment_receipt', 'id', 'uuid');
  SELECT col_default_is(    'payment_receipt', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'payment_receipt', 'id');

  SELECT has_column(        'payment_receipt', 'owner_id');
  SELECT col_type_is(       'payment_receipt', 'owner_id', 'uuid');
  SELECT col_not_null(      'payment_receipt', 'owner_id');
  SELECT col_default_is(    'payment_receipt', 'owner_id', 'request.user_id()');
  SELECT fk_ok(             'payment_receipt', 'owner_id', 'user', 'id');

  SELECT has_column(        'payment_receipt', 'payment_intent_id');
  SELECT col_type_is(       'payment_receipt', 'payment_intent_id', 'text');
  SELECT col_hasnt_default( 'payment_receipt', 'payment_intent_id');
  SELECT col_not_null(      'payment_receipt', 'payment_intent_id');

  SELECT has_column(        'payment_receipt', 'receipt_url');
  SELECT col_type_is(       'payment_receipt', 'receipt_url', 'text');
  SELECT col_is_null(       'payment_receipt', 'receipt_url');
  SELECT col_hasnt_default( 'payment_receipt', 'receipt_url');

  SELECT has_column(        'payment_receipt', 'amount');
  SELECT col_type_is(       'payment_receipt', 'amount', 'numeric');
  SELECT col_not_null(      'payment_receipt', 'amount');
  SELECT col_hasnt_default( 'payment_receipt', 'amount');

  SELECT has_column(        'payment_receipt', 'created_at');
  SELECT col_type_is(       'payment_receipt', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'payment_receipt', 'created_at');
  SELECT col_has_default(   'payment_receipt', 'created_at');
  SELECT col_default_is(    'payment_receipt', 'created_at', 'now()');

  SELECT has_column(        'payment_receipt', 'updated_at');
  SELECT col_type_is(       'payment_receipt', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'payment_receipt', 'updated_at');
  SELECT col_hasnt_default( 'payment_receipt', 'updated_at');

  SELECT indexes_are(
    'payment_receipt',
    ARRAY[
      'payment_receipt_pkey'
    ]
  );

  SELECT has_index(
    'payment_receipt',
    'payment_receipt_pkey'::NAME,
    ARRAY['id']
  );

  SELECT    finish();

ROLLBACK;

BEGIN;

  SELECT plan(28);

  SET SEARCH_PATH TO private, public;

  SELECT has_table('stripe_webhook');
  SELECT has_pk('stripe_webhook');
  SELECT columns_are(
    'stripe_webhook',
    ARRAY[
      'id'
      , 'customer'
      , 'type'
      , 'payload'
      , 'created_at'
    ]
  );

  SELECT has_column(        'stripe_webhook', 'id');
  SELECT col_type_is(       'stripe_webhook', 'id', 'text');
  SELECT col_hasnt_default( 'stripe_webhook', 'id');
  SELECT col_not_null(      'stripe_webhook', 'id');

  SELECT has_column(        'stripe_webhook', 'customer');
  SELECT col_type_is(       'stripe_webhook', 'customer', 'text');
  SELECT col_hasnt_default( 'stripe_webhook', 'customer');
  SELECT col_not_null(      'stripe_webhook', 'customer');

  SELECT has_column(        'stripe_webhook', 'type');
  SELECT col_type_is(       'stripe_webhook', 'type', 'text');
  SELECT col_hasnt_default( 'stripe_webhook', 'type');
  SELECT col_not_null(      'stripe_webhook', 'type');

  SELECT has_column(        'stripe_webhook', 'payload');
  SELECT col_type_is(       'stripe_webhook', 'payload', 'jsonb');
  SELECT col_hasnt_default( 'stripe_webhook', 'payload');
  SELECT col_not_null(      'stripe_webhook', 'payload');

  SELECT has_column(        'stripe_webhook', 'created_at');
  SELECT col_type_is(       'stripe_webhook', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'stripe_webhook', 'created_at');
  SELECT col_has_default(   'stripe_webhook', 'created_at');
  SELECT col_default_is(    'stripe_webhook', 'created_at', 'now()');

  SELECT indexes_are(
    'private', 'stripe_webhook', ARRAY[
      'stripe_webhook_pkey'
    ]
  );

  SELECT has_index(
    'stripe_webhook'
    , 'stripe_webhook_pkey'::NAME
    , ARRAY['id']
  );

  SELECT triggers_are(
    'private', 'stripe_webhook', ARRAY[
      'trg_stripe_webhook_update_user_sub'
    ]
  );

  SELECT trigger_is(
    'private'
    , 'stripe_webhook'
    , 'trg_stripe_webhook_update_user_sub'
    , 'util'
    , 'create_subscription_wh'
  );

  SELECT    finish();

ROLLBACK;

BEGIN;

  SELECT plan(37);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('billing_profile');
  SELECT has_pk('billing_profile');
  SELECT columns_are(
    'billing_profile',
    ARRAY[
      'id'
      , 'user_id'
      , 'customer_id'
      , 'customer_obj'
      , 'billing_details'
      , 'created_at'
      , 'updated_at'
    ]
  );

  SELECT has_column(        'billing_profile', 'id');
  SELECT col_type_is(       'billing_profile', 'id', 'uuid');
  SELECT col_default_is(    'billing_profile', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'billing_profile', 'id');

  SELECT has_column(        'billing_profile', 'user_id');
  SELECT col_type_is(       'billing_profile', 'user_id', 'uuid');
  SELECT col_not_null(      'billing_profile', 'user_id');
  SELECT col_hasnt_default( 'billing_profile', 'user_id');
  SELECT fk_ok(             'billing_profile', 'user_id', 'user', 'id');

  SELECT has_column(        'billing_profile', 'customer_obj');
  SELECT col_type_is(       'billing_profile', 'customer_obj', 'jsonb');
  SELECT col_hasnt_default( 'billing_profile', 'customer_obj');
  SELECT col_is_null(       'billing_profile', 'customer_obj');

  SELECT has_column(        'billing_profile', 'customer_id');
  SELECT col_type_is(       'billing_profile', 'customer_id', 'text');
  SELECT col_hasnt_default( 'billing_profile', 'customer_id');
  SELECT col_is_null(       'billing_profile', 'customer_id');

  SELECT has_column(        'billing_profile', 'billing_details');
  SELECT col_type_is(       'billing_profile', 'billing_details', 'jsonb');
  SELECT col_hasnt_default( 'billing_profile', 'billing_details');
  SELECT col_is_null(       'billing_profile', 'billing_details');

  SELECT has_column(        'billing_profile', 'created_at');
  SELECT col_type_is(       'billing_profile', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'billing_profile', 'created_at');
  SELECT col_has_default(   'billing_profile', 'created_at');
  SELECT col_default_is(    'billing_profile', 'created_at', 'now()');

  SELECT has_column(        'billing_profile', 'updated_at');
  SELECT col_type_is(       'billing_profile', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'billing_profile', 'updated_at');
  SELECT col_hasnt_default( 'billing_profile', 'updated_at');

  SELECT indexes_are(
    'api', 'billing_profile', ARRAY[
      'billing_profile_pkey'
    ]
  );

  SELECT has_index(
    'billing_profile'
    , 'billing_profile_pkey'::NAME
    , ARRAY['id']
  );

  SELECT triggers_are(
    'api', 'billing_profile', ARRAY[
      'trg_billing_profile_set_updated_at'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'billing_profile'
    , 'trg_billing_profile_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT    finish();

ROLLBACK;

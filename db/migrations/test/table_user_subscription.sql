BEGIN;

  SELECT plan(45);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('user_subscription');
  SELECT has_pk('user_subscription');
  SELECT columns_are(
    'user_subscription',
    ARRAY[
      'id'
      , 'user_id'
      , 'billing_profile_id'
      , 'plan_subscription_id'
      , 'status'
      , 'ends_at'
      , 'created_at'
      , 'updated_at'
    ]
  );

  SELECT has_column(        'user_subscription', 'id');
  SELECT col_type_is(       'user_subscription', 'id', 'uuid');
  SELECT col_default_is(    'user_subscription', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'user_subscription', 'id');

  SELECT has_column(        'user_subscription', 'user_id');
  SELECT col_type_is(       'user_subscription', 'user_id', 'uuid');
  SELECT col_not_null(      'user_subscription', 'user_id');
  SELECT col_has_default(   'user_subscription', 'user_id');
  SELECT col_default_is(    'user_subscription', 'user_id', 'request.user_id()');
  SELECT fk_ok(             'user_subscription', 'user_id', 'user', 'id');

  SELECT has_column(        'user_subscription', 'billing_profile_id');
  SELECT col_type_is(       'user_subscription', 'billing_profile_id', 'uuid');
  SELECT col_is_null(       'user_subscription', 'billing_profile_id');
  SELECT col_hasnt_default( 'user_subscription', 'billing_profile_id');
  SELECT fk_ok(             'user_subscription', 'billing_profile_id', 'billing_profile', 'id');

  SELECT has_column(        'user_subscription', 'plan_subscription_id');
  SELECT col_type_is(       'user_subscription', 'plan_subscription_id', 'text');
  SELECT col_hasnt_default( 'user_subscription', 'plan_subscription_id');
  SELECT col_is_null(       'user_subscription', 'plan_subscription_id');

  SELECT has_column(        'user_subscription', 'status');
  SELECT col_type_is(       'user_subscription', 'status', 'subscription_status_t');
  SELECT col_is_null(       'user_subscription', 'status');
  SELECT col_has_default(   'user_subscription', 'status');
  SELECT col_default_is(    'user_subscription', 'status', 'unpaid');

  SELECT has_column(        'user_subscription', 'ends_at');
  SELECT col_type_is(       'user_subscription', 'ends_at', 'timestamp with time zone');
  SELECT col_not_null(      'user_subscription', 'ends_at');
  SELECT col_hasnt_default( 'user_subscription', 'ends_at');

  SELECT has_column(        'user_subscription', 'created_at');
  SELECT col_type_is(       'user_subscription', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'user_subscription', 'created_at');
  SELECT col_has_default(   'user_subscription', 'created_at');
  SELECT col_default_is(    'user_subscription', 'created_at', 'now()');

  SELECT has_column(        'user_subscription', 'updated_at');
  SELECT col_type_is(       'user_subscription', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'user_subscription', 'updated_at');
  SELECT col_hasnt_default( 'user_subscription', 'updated_at');

  SELECT indexes_are(
    'api', 'user_subscription', ARRAY[
      'user_subscription_pkey'
    ]
  );

  SELECT has_index(
    'user_subscription'
    , 'user_subscription_pkey'::NAME
    , ARRAY['id']
  );

  SELECT triggers_are(
    'api', 'user_subscription', ARRAY[
      'trg_user_subscription_set_updated_at'
      , 'trg_update_user_role_on_subscription_change'
    ]
  );

  SELECT trigger_is(
    'api'
    , 'user_subscription'
    , 'trg_user_subscription_set_updated_at'
    , 'util'
    , 'set_updated_at'
  );

  SELECT trigger_is(
    'api'
    , 'user_subscription'
    , 'trg_update_user_role_on_subscription_change'
    , 'util'
    , 'update_role_on_subscription'
  );

  SELECT    finish();

ROLLBACK;

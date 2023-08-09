BEGIN;

  SELECT plan(74);

  SET SEARCH_PATH TO api, public;

  SELECT has_table('user');
  SELECT has_pk('user');
  SELECT columns_are(
    'user',
    ARRAY[
      'id'
      , 'name'
      , 'email'
      , 'email_confirmed'
      , 'status'
      , 'role'
      , 'photo_url'
      , 'phone'
      , 'address'
      , 'settings'
      , 'created_at'
      , 'updated_at'
      , 'deleted'
      , 'deleted_at'
      ]
  );

  SELECT has_column(        'user', 'id');
  SELECT col_type_is(       'user', 'id', 'uuid');
  SELECT col_default_is(    'user', 'id', 'uuid_generate_v4()');
  SELECT col_not_null(      'user', 'id');

  SELECT has_column(        'user', 'name');
  SELECT col_type_is(       'user', 'name', 'text');
  SELECT col_hasnt_default( 'user', 'name');
  SELECT col_not_null(      'user', 'name');

  SELECT has_column(        'user', 'email');
  SELECT col_type_is(       'user', 'email', 'email');
  SELECT col_hasnt_default( 'user', 'email');
  SELECT col_not_null(      'user', 'email');

  SELECT has_column(        'user', 'email_confirmed');
  SELECT col_type_is(       'user', 'email_confirmed', 'boolean');
  SELECT col_not_null(      'user', 'email_confirmed');
  SELECT col_has_default(   'user', 'email_confirmed');
  SELECT col_default_is(    'user', 'email_confirmed', 'false');

  SELECT has_column(        'user', 'status');
  SELECT col_type_is(       'user', 'status', 'status_t');
  SELECT col_not_null(      'user', 'status');
  SELECT col_has_default(   'user', 'status');
  SELECT col_default_is(    'user', 'status', 'disabled');

  SELECT has_column(        'user', 'role');
  SELECT col_type_is(       'user', 'role', 'citext');
  SELECT col_not_null(      'user', 'role');
  SELECT col_has_default(   'user', 'role');
  SELECT col_default_is(    'user', 'role', $$(settings.get('auth.default-single-role'::text))::citext$$);

  SELECT has_column(        'user', 'photo_url');
  SELECT col_type_is(       'user', 'photo_url', 'text');
  SELECT col_hasnt_default( 'user', 'photo_url');
  SELECT col_is_null(       'user', 'photo_url');

  SELECT has_column(        'user', 'phone');
  SELECT col_type_is(       'user', 'phone', 'phone_us');
  SELECT col_is_null(       'user', 'phone');
  SELECT col_hasnt_default( 'user', 'phone');

  SELECT has_column(        'user', 'address');
  SELECT col_type_is(       'user', 'address', 'json');
  SELECT col_hasnt_default( 'user', 'address');
  SELECT col_is_null(       'user', 'address');

  SELECT has_column(        'user', 'settings');
  SELECT col_type_is(       'user', 'settings', 'json');
  SELECT col_hasnt_default( 'user', 'settings');
  SELECT col_is_null(       'user', 'settings');

  SELECT has_column(        'user', 'created_at');
  SELECT col_type_is(       'user', 'created_at', 'timestamp with time zone');
  SELECT col_not_null(      'user', 'created_at');
  SELECT col_has_default(   'user', 'created_at');
  SELECT col_default_is(    'user', 'created_at', 'now()');

  SELECT has_column(        'user', 'updated_at');
  SELECT col_type_is(       'user', 'updated_at', 'timestamp with time zone');
  SELECT col_is_null(       'user', 'updated_at');
  SELECT col_hasnt_default( 'user', 'updated_at');

  SELECT has_column(        'user', 'deleted');
  SELECT col_type_is(       'user', 'deleted', 'boolean');
  SELECT col_not_null(      'user', 'deleted');
  SELECT col_has_default(   'user', 'deleted');
  SELECT col_default_is(    'user', 'deleted', 'false');

  SELECT has_column(        'user', 'deleted_at');
  SELECT col_type_is(       'user', 'deleted_at', 'timestamp with time zone');
  SELECT col_is_null(       'user', 'deleted_at');
  SELECT col_hasnt_default( 'user', 'deleted_at');

  SELECT indexes_are(
    'api',
    'user',
    ARRAY[
    'user_pkey'
    , 'user_email_unique_idx'
    , 'user_role_idx'
    ]);

  SELECT has_index(
    'user', 'user_pkey'::NAME, ARRAY['id']);
  SELECT has_index(
    'user', 'user_email_unique_idx'::NAME, ARRAY['email']);
  SELECT has_index(
    'user', 'user_role_idx'::NAME, ARRAY['role']);

  SELECT triggers_are(
    'api',
    'user',
    ARRAY[
      'trg_user_set_updated_at'
      , 'trg_user_soft_delete_user'
      , 'trg_user_restrict_role_change_on_insert'
      , 'trg_user_restrict_role_change_on_update'
      , 'trg_set_defaults_for_user'
      ]);

  SELECT trigger_is(
    'api', 'user',
    'trg_user_set_updated_at',
    'util',
    'set_updated_at'
  );

  SELECT trigger_is('api', 'user',
    'trg_user_soft_delete_user',
    'util',
    'soft_delete_user'
  );

  SELECT trigger_is('api', 'user',
    'trg_user_restrict_role_change_on_insert',
    'util',
    'restrict_role_change'
  );

  SELECT trigger_is('api', 'user',
    'trg_user_restrict_role_change_on_update',
    'util',
    'restrict_role_change'
  );

  SELECT trigger_is('api', 'user',
    'trg_set_defaults_for_user',
    'util',
    'set_defaults_for_user'
  );

  SELECT finish();

ROLLBACK;

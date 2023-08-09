BEGIN;

  SELECT * FROM plan(6);

  SELECT sequences_are(
    'util'::NAME,
    ARRAY[
      'short_code'
      , 'slug_uniqueness_sequence'
      , 'api_key'
    ]
  );

  SELECT functions_are(
    'util',
    ARRAY[
      'set_updated_at'
      , 'hashid_encode'
      , 'pg_event_pg_notify_insert'
      , 'pg_event_send'
      , 'soft_delete_record'
      , 'soft_delete_user'
      , 'generate_slug_on_name'
      , 'slugify'
      , 'check_slot_availability'
      , 'restrict_role_change'
      , 'set_defaults_for_user'
      , 'create_subscription_wh'
      , 'update_role_on_subscription'
      , 'soft_delete_slot'
      , 'soft_delete_space'
    ]
  );

  SELECT types_are('util'::NAME,
    ARRAY[
      'check_slot_availability_input'
    ]);

  SELECT domains_are('util'::NAME, '{}');

  SELECT views_are('util'::NAME, '{}');

  SELECT tables_are('util'::NAME, '{}');

  SELECT * FROM finish();

ROLLBACK;

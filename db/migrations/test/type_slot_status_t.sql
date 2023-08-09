BEGIN;

  SELECT plan(2);

  SELECT has_enum('public'::NAME, 'slot_status_t'::NAME);
  SELECT enum_has_labels(
    'slot_status_t'::NAME
    , ARRAY[
      'enabled'
      , 'disabled'
      , 'unlisted'
      , 'deleted'
    ]
  );

  SELECT    finish();

ROLLBACK;

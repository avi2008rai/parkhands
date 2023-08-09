BEGIN;

  SELECT	  plan(2);

  SELECT has_enum('public'::NAME, 'status_t'::NAME);

  SELECT enum_has_labels(
    'status_t'::NAME
    , ARRAY[
      'enabled'
      , 'disabled'
      , 'pending'
      ]
  );

  SELECT	  finish();

ROLLBACK;

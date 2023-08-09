BEGIN;

  SELECT plan(2);

  SELECT has_enum('public'::NAME, 'slot_verification_status'::NAME);
  SELECT enum_has_labels(
    'slot_verification_status'::NAME
    , ARRAY[
      'pending'
      , 'rejected'
      , 'verified'
    ]
  );

  SELECT    finish();

ROLLBACK;

BEGIN;

  SELECT plan(2);

  SELECT has_enum('public'::NAME, 'payment_status_t'::NAME);

  SELECT enum_has_labels('payment_status_t'::NAME,
    ARRAY[
      'pending'
      , 'paid'
      , 'failed'
      , 'canceled'
    ]
  );

  SELECT finish();

ROLLBACK;

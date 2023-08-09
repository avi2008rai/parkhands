BEGIN;

  SELECT plan(2);

  SELECT has_enum('public'::NAME, 'subscription_status_t'::NAME);

  SELECT enum_has_labels('subscription_status_t'::NAME,
    ARRAY[
      'active'
      , 'past_due'
      , 'unpaid'
      , 'canceled'
      , 'incomplete'
      , 'incomplete_expired'
      , 'trialing'
    ]
  );

  SELECT finish();

ROLLBACK;

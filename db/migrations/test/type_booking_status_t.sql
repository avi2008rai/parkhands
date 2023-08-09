BEGIN;

  SELECT plan(2);

  SELECT has_enum('public'::NAME, 'booking_status_t'::NAME);
  SELECT enum_has_labels(
    'booking_status_t'::NAME
    , ARRAY[
      'pending'
      , 'reserved'
      , 'canceled'
      ]
  );

  SELECT    finish();

ROLLBACK;

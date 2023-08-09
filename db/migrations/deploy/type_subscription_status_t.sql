-- Deploy PH:type_subscription_status_t to pg

BEGIN;

  CREATE TYPE public.subscription_status_t AS ENUM (
    'active'
    , 'past_due'
    , 'unpaid'
    , 'canceled'
    , 'incomplete'
    , 'incomplete_expired'
    , 'trialing'
  );

  COMMENT ON TYPE public.status_t IS 'Status for subscription from stripe';

COMMIT;


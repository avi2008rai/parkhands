-- Deploy PH:type_payment_status_t to pg

BEGIN;

  CREATE TYPE public.payment_status_t AS ENUM (
    'pending'
    , 'paid'
    , 'failed'
    , 'canceled'
  );

  COMMENT ON TYPE public.status_t IS 'Status for single payments from stripe';

COMMIT;


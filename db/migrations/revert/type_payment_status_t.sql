-- Revert PH:type_payment_status_t from pg

BEGIN;

  DROP TYPE public.payment_status_t;

COMMIT;

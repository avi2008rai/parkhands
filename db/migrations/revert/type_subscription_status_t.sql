-- Revert PH:type_subscription_status_t from pg

BEGIN;

  DROP TYPE public.subscription_status_t;

COMMIT;

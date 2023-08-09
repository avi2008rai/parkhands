-- Revert PH:table_stripe_webhook from pg

BEGIN;

  DROP TABLE private.stripe_webhook;

COMMIT;

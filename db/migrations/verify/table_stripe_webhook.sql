-- Verify PH:table_stripe_webhook on pg

BEGIN;

  SELECT
    id
    , customer
    , type
    , payload
    , created_at
  FROM private.stripe_webhook
    WHERE FALSE;

  SELECT 1/COUNT(*) FROM pg_trigger
    WHERE tgname IN (
      'trg_stripe_webhook_update_user_sub'
    );

ROLLBACK;

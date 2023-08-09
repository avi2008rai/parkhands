-- Deploy PH:table_stripe_webhook to pg
-- requires: schema_private

BEGIN;

  CREATE TABLE private.stripe_webhook (
    id            TEXT PRIMARY KEY,
    customer      TEXT NOT NULL,
    type          TEXT NOT NULL,
    payload       JSONB NOT NULL,
    created_at    TIMESTAMPTZ DEFAULT now() NOT NULL
  );

  CREATE TRIGGER trg_stripe_webhook_update_user_sub
    AFTER INSERT ON private.stripe_webhook
    FOR EACH ROW
    WHEN (NEW.type ILIKE 'customer.subscription%')
    EXECUTE PROCEDURE util.create_subscription_wh();

COMMIT;

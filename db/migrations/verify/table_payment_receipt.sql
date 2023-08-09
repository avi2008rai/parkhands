-- Verify PH:table_payment_receipt on pg

BEGIN;

  SELECT
    id
    , owner_id
    , payment_intent_id
    , receipt_url
    , amount
    , created_at
    , updated_at
  FROM api.payment_receipt
    WHERE FALSE;

ROLLBACK;

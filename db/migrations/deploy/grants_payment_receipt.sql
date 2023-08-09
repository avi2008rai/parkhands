-- Deploy PH:grants_payment_receipt to pg
-- requires: table_payment_receipt

BEGIN;

  GRANT SELECT ON api.payment_receipt TO base_single;
  GRANT DELETE ON api.payment_receipt TO base_single;

  GRANT INSERT (
    owner_id
    , payment_intent_id
    , receipt_url
    , amount
  ) ON api.payment_receipt TO base_single;

  GRANT SELECT ON api.payment_receipt TO base_super;
  GRANT INSERT ON api.payment_receipt TO base_super;
  GRANT DELETE ON api.payment_receipt TO base_super;

COMMIT;

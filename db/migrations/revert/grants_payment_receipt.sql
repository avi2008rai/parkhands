-- Revert PH:grants_payment_receipt from pg

BEGIN;

  REVOKE SELECT ON api.payment_receipt FROM base_single;
  REVOKE INSERT ON api.payment_receipt FROM base_single;
  REVOKE DELETE ON api.payment_receipt FROM base_single;

  REVOKE SELECT ON api.payment_receipt FROM base_super;
  REVOKE INSERT ON api.payment_receipt FROM base_super;
  REVOKE DELETE ON api.payment_receipt FROM base_super;

COMMIT;

-- Revert PH:table_payment_receipt from pg

BEGIN;

  DROP TABLE api.payment_receipt;

COMMIT;

-- Revert PH:rls_payment_receipt from pg

BEGIN;

  ALTER TABLE api.payment_receipt DISABLE ROW LEVEL SECURITY;

  DROP POLICY crud_any_rows ON api.payment_receipt;
  DROP POLICY crud_own_rows ON api.payment_receipt;

COMMIT;

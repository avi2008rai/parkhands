-- Deploy PH:rls_payment_receipt to pg
-- requires: table_payment_receipt

BEGIN;

  ALTER TABLE api.payment_receipt ENABLE ROW LEVEL SECURITY;

  CREATE POLICY crud_any_rows ON api.payment_receipt
  USING (
    pg_catalog.pg_has_role(request.user_role(), 'base_super', 'MEMBER')
  );

  CREATE POLICY crud_own_rows ON api.payment_receipt
  USING (
    owner_id = request.user_id()
  );

COMMIT;

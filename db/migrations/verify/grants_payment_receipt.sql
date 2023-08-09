-- Verify PH:grants_payment_receipt on pg

DO $$
DECLARE
  t_name TEXT := 'api.payment_receipt';
  r_single TEXT := 'base_single';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT has_table_privilege(r_single, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_single, t_name, 'DELETE'));

  ASSERT (SELECT has_table_privilege(r_super, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'INSERT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'DELETE'));

  -- column privs
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'id', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'owner_id', 'SELECT, INSERT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'payment_intent_id', 'SELECT, INSERT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'receipt_url', 'SELECT, INSERT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'amount', 'SELECT, INSERT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'created_at', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'updated_at', 'SELECT'));

END $$;

-- Verify PH:grants_billing_profile on pg

BEGIN;

DO $$
DECLARE
  t_name TEXT := 'api.billing_profile';
  r_single TEXT := 'base_single';
  r_provider TEXT := 'base_provider';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT has_table_privilege(r_single, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_single, t_name, 'DELETE'));

  ASSERT (SELECT has_table_privilege(r_super, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'INSERT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'UPDATE'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'DELETE'));

  -- column privs
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'id', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'customer_obj', 'SELECT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'customer_id', 'SELECT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'billing_details', 'SELECT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'created_at', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'updated_at', 'SELECT'));

    -- column privs FOR provider
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'id', 'SELECT'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'user_id', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'customer_obj', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'customer_id', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'billing_details', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'created_at', 'SELECT'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'updated_at', 'SELECT'));

END $$;

ROLLBACK;

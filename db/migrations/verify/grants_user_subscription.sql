-- Verify PH:grants_user_subscription on pg

BEGIN;

DO $$
DECLARE
  t_name TEXT := 'api.user_subscription';
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
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'user_id', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'billing_profile_id', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'status', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'ends_at', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'created_at', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'updated_at', 'SELECT'));

    -- column privs FOR provider
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'id', 'SELECT'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'user_id', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'billing_profile_id', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'status', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'ends_at', 'SELECT, INSERT, UPDATE'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'created_at', 'SELECT'));
  -- ASSERT (SELECT has_column_privilege(r_provider, t_name, 'updated_at', 'SELECT'));


END $$;

ROLLBACK;

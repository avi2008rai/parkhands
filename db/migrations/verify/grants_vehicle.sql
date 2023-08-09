-- Verify PH:grants_vehicle on pg

BEGIN;

DO $$
DECLARE
  t_name TEXT := 'api.vehicle';
  r_single TEXT := 'base_single';
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
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'owner_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'name', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'license_plate', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'vehicle_type_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'vehicle_size_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'status', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'created_at', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'updated_at', 'SELECT'));

END $$;

ROLLBACK;

-- Verify PH:grants_slot on pg

DO $$
DECLARE
  t_name TEXT := 'api.slot';
  r_anon TEXT := 'app_anonymous';
  r_single TEXT := 'base_single';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT has_table_privilege(r_anon, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'INSERT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'UPDATE'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'DELETE'));

  -- column privs
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'id', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'name', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'owner_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'vehicle_size_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'address', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'timezone', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'price_per_hour', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'status', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'photo_url', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'description', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'notes', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'location', 'SELECT, INSERT, UPDATE'));

END $$;

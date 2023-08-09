-- Verify PH:grants_slot_availability on pg

DO $$
DECLARE
  t_name TEXT := 'api.slot_availability';
  r_anon TEXT := 'app_anonymous';
  r_single TEXT := 'base_single';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT has_table_privilege(r_anon, t_name, 'SELECT'));

  ASSERT (SELECT has_table_privilege(r_single, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_single, t_name, 'DELETE'));

  ASSERT (SELECT has_table_privilege(r_super, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'INSERT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'UPDATE'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'DELETE'));

  -- column privs
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'id', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'slot_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'day_of_week', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'start_hour', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'end_hour', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'created_at', 'SELECT'));

END $$;

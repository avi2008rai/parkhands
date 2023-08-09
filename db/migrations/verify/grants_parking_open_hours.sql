-- Verify PH:grants_parking_open_hours on pg

BEGIN;

DO $$
DECLARE
  t_name TEXT := 'api.parking_open_hours';
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

END $$;

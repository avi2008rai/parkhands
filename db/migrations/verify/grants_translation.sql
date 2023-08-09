-- Verify PH:grants_translation on pg

DO $$
DECLARE
  t_name TEXT := 'api.translation';
  r_anon TEXT := 'app_anonymous';
  r_single TEXT := 'base_single';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT has_table_privilege(r_anon, t_name, 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege(r_anon, t_name, 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege(r_anon, t_name, 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege(r_anon, t_name, 'DELETE'));

  ASSERT (SELECT has_table_privilege(r_single, t_name, 'SELECT'));
  ASSERT (SELECT NOT has_table_privilege(r_single, t_name, 'INSERT'));
  ASSERT (SELECT NOT has_table_privilege(r_single, t_name, 'UPDATE'));
  ASSERT (SELECT NOT has_table_privilege(r_single, t_name, 'DELETE'));

  ASSERT (SELECT has_table_privilege(r_super, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'INSERT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'UPDATE'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'DELETE'));

END $$;

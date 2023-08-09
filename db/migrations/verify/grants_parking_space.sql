-- Verify PH:grants_parking_space on pg

DO $$
DECLARE
  t_name        TEXT DEFAULT 'api.parking_space';
  r_anon        TEXT DEFAULT 'app_anonymous';
  r_single      TEXT DEFAULT 'base_single';
  r_provider    TEXT DEFAULT 'app_provider';
  r_premium     TEXT DEFAULT 'app_provider_premium';
  r_super       TEXT DEFAULT 'base_super';
BEGIN

  ASSERT (SELECT has_table_privilege(r_anon, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_single, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_provider, t_name, 'SELECT'));

  ASSERT (SELECT has_table_privilege(r_super, t_name, 'SELECT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'INSERT'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'UPDATE'));
  ASSERT (SELECT has_table_privilege(r_super, t_name, 'DELETE'));

  -- app_provider_premium
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'id', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'owner_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'name', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'description', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'photo_url', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'settings', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'address', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'location', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'slug', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'created_at', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'updated_at', 'SELECT'));

END $$;

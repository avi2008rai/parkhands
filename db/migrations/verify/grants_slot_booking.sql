-- Verify PH:grants_slot_booking on pg

DO $$
DECLARE
  t_name TEXT := 'timescale.slot_booking';
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
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'slot_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'user_id', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'status', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'license_plate', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'start_time', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'end_time', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'created_at', 'SELECT'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'phone', 'SELECT, INSERT, UPDATE'));
  ASSERT (SELECT has_column_privilege(r_single, t_name, 'payment_receipt_id', 'SELECT, INSERT, UPDATE'));

END $$;

-- Verify PH:fn_can_book_slot on pg

DO $$
DECLARE
  f_name TEXT := 'api.can_book_slot(json)';
  r_anon TEXT := 'app_anonymous';
  r_single TEXT := 'base_single';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT has_function_privilege(f_name, 'EXECUTE'));
  ASSERT (SELECT NOT has_function_privilege('public', f_name, 'EXECUTE'));
  ASSERT (SELECT NOT has_function_privilege(r_anon, f_name, 'EXECUTE'));
  ASSERT (SELECT has_function_privilege(r_single, f_name, 'EXECUTE'));
  ASSERT (SELECT has_function_privilege(r_super, f_name, 'EXECUTE'));

END $$;

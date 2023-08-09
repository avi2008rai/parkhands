-- Verify PH:fn_session_check on pg

DO $$
DECLARE
  f_name TEXT := 'public.session_check()';
  r_single TEXT := 'base_single';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT has_function_privilege(f_name, 'EXECUTE'));
  ASSERT (SELECT has_function_privilege('public', f_name, 'EXECUTE'));
  ASSERT (SELECT has_function_privilege(r_single, f_name, 'EXECUTE'));
  ASSERT (SELECT has_function_privilege(r_super, f_name, 'EXECUTE'));

END $$;

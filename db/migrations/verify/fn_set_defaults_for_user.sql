-- Verify PH:fn_set_defaults_for_user on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('util.set_defaults_for_user()', 'EXECUTE'));

END $$;

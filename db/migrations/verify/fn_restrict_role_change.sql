-- Verify PH:fn_restrict_role_change on pg

DO $$
BEGIN

  ASSERT (SELECT pg_catalog.has_function_privilege('util.restrict_role_change()', 'EXECUTE'));

END $$;

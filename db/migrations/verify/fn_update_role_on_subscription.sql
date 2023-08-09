-- Verify PH:fn_update_role_on_subscription on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('util.update_role_on_subscription()', 'EXECUTE'));

END $$;

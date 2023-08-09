-- Verify PH:fn_create_subscription_wh on pg

DO $$
BEGIN

  ASSERT (SELECT has_function_privilege('util.create_subscription_wh()', 'EXECUTE'));

END $$;

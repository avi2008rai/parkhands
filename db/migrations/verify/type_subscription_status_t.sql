-- Verify PH:type_subscription_status_t on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.subscription_status_t', 'usage'));

END $$;

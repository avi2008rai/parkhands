-- Verify PH:type_payment_status_t on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.payment_status_t', 'usage'));

END $$;

-- Verify PH:type_content_status on pg

DO $$
BEGIN

ASSERT (SELECT has_type_privilege('public.content_status_t', 'usage'));

END $$;

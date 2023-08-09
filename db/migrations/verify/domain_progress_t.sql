-- Verify PH:domain_progress_t on pg

BEGIN;

SELECT has_type_privilege('public.progress_t', 'usage');

ROLLBACK;

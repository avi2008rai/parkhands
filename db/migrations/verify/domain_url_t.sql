-- Verify MM:domain_url_t on pg

BEGIN;

SELECT has_type_privilege('public.url_t', 'usage');

ROLLBACK;

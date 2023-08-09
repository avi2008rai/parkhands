-- Revert PH:domain_progress_t from pg

BEGIN;

DROP DOMAIN public.progress_t;

COMMIT;

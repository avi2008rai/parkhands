-- Revert MM:domain_url_t from pg

BEGIN;

  DROP DOMAIN public.url_t;

COMMIT;

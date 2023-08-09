-- Revert PH:domain_email from pg

BEGIN;

  DROP DOMAIN public.email;

COMMIT;

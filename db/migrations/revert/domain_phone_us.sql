-- Revert PH:domain_phone_us to pg

BEGIN;

DROP DOMAIN public.phone_us;

COMMIT;

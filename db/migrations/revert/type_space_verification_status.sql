-- Revert PH:type_space_verification_status from pg

BEGIN;

DROP TYPE public.space_verification_status;

COMMIT;

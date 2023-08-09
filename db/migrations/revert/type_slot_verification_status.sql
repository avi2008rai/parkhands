-- Revert PH:type_slot_verification_status from pg

BEGIN;

DROP TYPE public.slot_verification_status;

COMMIT;

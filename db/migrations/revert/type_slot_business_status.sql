-- Revert PH:type_business_status from pg

BEGIN;

  DROP TYPE public.slot_business_status;

COMMIT;

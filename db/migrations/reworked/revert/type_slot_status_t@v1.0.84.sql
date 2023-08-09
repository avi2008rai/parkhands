-- Revert PH:type_slot_status_t from pg

BEGIN;

  DROP TYPE public.slot_status_t;

COMMIT;

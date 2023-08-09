-- Revert PH:type_slot_category from pg

BEGIN;

  DROP TYPE public.slot_category;

COMMIT;

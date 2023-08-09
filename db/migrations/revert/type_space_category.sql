-- Revert PH:type_space_category from pg

BEGIN;

DROP TYPE public.space_category;

COMMIT;

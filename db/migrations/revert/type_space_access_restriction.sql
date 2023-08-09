-- Revert PH:type_space_access_restriction from pg

BEGIN;

DROP TYPE public.space_access_restriction;

COMMIT;

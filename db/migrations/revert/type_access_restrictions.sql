-- Revert PH:type_access_restrictions from pg

BEGIN;

    DROP TYPE public.access_restrictions;

COMMIT;

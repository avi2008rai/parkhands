-- Revert PH:type_status from pg

BEGIN;

DROP TYPE public.status_t;

COMMIT;

-- Revert PH:type_content_status from pg

BEGIN;

DROP TYPE public.content_status_t;

COMMIT;

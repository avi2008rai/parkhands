-- Revert PH:type_user to pg

BEGIN;

DROP TYPE public.user_t;

COMMIT;

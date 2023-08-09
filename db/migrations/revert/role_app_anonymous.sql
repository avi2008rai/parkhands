-- Revert PH:role_app_anonymous from pg

BEGIN;

DROP ROLE app_anonymous;

COMMIT;

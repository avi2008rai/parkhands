-- Revert PH:role_app_single_member from pg

BEGIN;

DROP ROLE app_single_member;

COMMIT;

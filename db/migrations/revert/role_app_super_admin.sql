-- Revert PH:role_app_super_admin from pg

BEGIN;

DROP ROLE app_super_admin;

COMMIT;

-- Revert PH:view_user_roles to pg

BEGIN;

DROP VIEW api.user_roles;

COMMIT;

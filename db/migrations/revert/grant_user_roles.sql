-- Revert PH:grant_user_roles to pg

BEGIN;

REVOKE SELECT ON api.user_roles FROM base_single;

COMMIT;

-- Revert PH:grant_user to pg

BEGIN;

REVOKE SELECT ON api.user FROM app_anonymous;

REVOKE SELECT ON api.user FROM base_single;
REVOKE INSERT ON api.user FROM base_single;
REVOKE UPDATE ON api.user FROM base_single;
REVOKE DELETE ON api.user FROM base_single;

COMMIT;

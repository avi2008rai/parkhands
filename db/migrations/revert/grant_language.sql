-- Revert PH:grant_language from pg

BEGIN;

REVOKE SELECT ON api.language FROM app_anonymous;
REVOKE SELECT ON api.language FROM base_single;

REVOKE SELECT ON api.language FROM base_super;
REVOKE INSERT ON api.language FROM base_super;
REVOKE UPDATE ON api.language FROM base_super;
REVOKE DELETE ON api.language FROM base_super;

COMMIT;

-- Revert PH:grant_country from pg

BEGIN;

REVOKE SELECT ON api.country FROM app_anonymous;
REVOKE SELECT ON api.country FROM base_single;

REVOKE SELECT ON api.country FROM base_super;
REVOKE INSERT ON api.country FROM base_super;
REVOKE UPDATE ON api.country FROM base_super;
REVOKE DELETE ON api.country FROM base_super;

COMMIT;

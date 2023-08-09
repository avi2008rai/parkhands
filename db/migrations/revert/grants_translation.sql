-- Revert PH:grants_translation from pg

BEGIN;

REVOKE SELECT ON api.translation FROM app_anonymous;
REVOKE SELECT ON api.translation FROM base_single;

REVOKE SELECT ON api.translation FROM base_super;
REVOKE INSERT ON api.translation FROM base_super;
REVOKE UPDATE ON api.translation FROM base_super;
REVOKE DELETE ON api.translation FROM base_super;

COMMIT;

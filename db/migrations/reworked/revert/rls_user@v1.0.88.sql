-- Revert PH:rls_user to pg

BEGIN;

ALTER TABLE api.user DISABLE ROW LEVEL SECURITY;

DROP POLICY crud_any_rows ON api.user;
DROP POLICY crud_own_rows ON api.user;

COMMIT;

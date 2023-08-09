-- Deploy PH:grant_user_roles to pg
-- requires: view_user_roles

BEGIN;

GRANT SELECT ON api.user_roles TO base_single;

COMMIT;

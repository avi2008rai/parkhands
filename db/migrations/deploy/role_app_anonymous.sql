-- Deploy PH:role_app_anonymous to pg

BEGIN;

\set authenticator `echo $DB_USER`

-- this is an application level role
-- requests that are not authenticated will be executed with this role's privileges
CREATE ROLE app_anonymous;
COMMENT ON ROLE app_anonymous IS 'anonymous application level end role';

GRANT app_anonymous TO :authenticator;

COMMIT;

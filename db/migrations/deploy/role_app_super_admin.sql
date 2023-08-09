-- Deploy PH:role_app_super_admin to pg

BEGIN;

\set authenticator `echo $DB_USER`

-- this is an application level role
CREATE ROLE app_super_admin;
COMMENT ON ROLE app_super_admin IS 'app_super_admin application level end role';

GRANT app_super_admin TO :authenticator;

COMMIT;

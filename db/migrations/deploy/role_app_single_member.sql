-- Deploy PH:role_app_single_member to pg

BEGIN;

\set authenticator `echo $DB_USER`

-- this is an application level role
CREATE ROLE app_single_member;
COMMENT ON ROLE app_single_member IS 'app_single_member application level end role';

GRANT app_single_member TO :authenticator;

COMMIT;

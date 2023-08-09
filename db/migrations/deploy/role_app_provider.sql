-- Deploy PH:role_app_provider to pg

BEGIN;

\set authenticator `echo $DB_USER`

-- this is an application level role
CREATE ROLE app_provider;
COMMENT ON ROLE app_provider IS 'app_provider application level end role';

GRANT app_provider TO :authenticator;

COMMIT;

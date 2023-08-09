-- Deploy PH:role_app_provider_premium to pg

BEGIN;

\set authenticator `echo $DB_USER`

-- this is an application level role
CREATE ROLE app_provider_premium;
COMMENT ON ROLE app_provider_premium IS 'app_provider_premium application level end role';

GRANT app_provider_premium TO :authenticator;

COMMIT;

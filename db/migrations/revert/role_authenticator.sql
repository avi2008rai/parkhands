-- Revert PH:role_authenticator from pg

BEGIN;

\set authenticator `echo $DB_USER`

DROP ROLE :authenticator;

COMMIT;

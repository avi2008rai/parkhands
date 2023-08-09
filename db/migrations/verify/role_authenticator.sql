-- Verify PH:role_authenticator on pg

BEGIN;

  \set authenticator `echo $DB_USER`

  SELECT 1/COUNT(*)
    FROM pg_catalog.pg_roles
   WHERE rolname = :'authenticator';

ROLLBACK;

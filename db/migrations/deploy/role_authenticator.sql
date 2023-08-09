-- Deploy PH:role_authenticator to pg

BEGIN;

\set authenticator `echo $DB_USER`
\set authenticator_pass `echo $DB_PASS`

-- the role used by postgraphile to connect to the database
-- notice how this role does not have any privileges attached specifically to it
-- it can only switch to other roles
CREATE ROLE :authenticator WITH LOGIN PASSWORD :'authenticator_pass' NOINHERIT;
COMMENT ON ROLE :authenticator IS 'role used by postgraphile to connect to the database';

COMMIT;

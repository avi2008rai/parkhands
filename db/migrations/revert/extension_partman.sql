-- Revert PH:extension_partman from pg

BEGIN;

\set db_name `echo $DB_NAME`
\set db_schema `echo $DB_SCHEMA`

DROP SCHEMA partman CASCADE;
REVOKE ALL ON SCHEMA :db_schema FROM partman;
REVOKE CREATE ON DATABASE :db_name FROM partman;
DROP ROLE partman;

COMMIT;

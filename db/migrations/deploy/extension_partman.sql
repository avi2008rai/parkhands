-- Deploy PH:extension_partman to pg

BEGIN;

\set db_name `echo $DB_NAME`
\set db_schema `echo $DB_SCHEMA`

CREATE SCHEMA partman;
CREATE EXTENSION IF NOT EXISTS pg_partman SCHEMA partman;

CREATE ROLE partman WITH LOGIN;
GRANT ALL ON SCHEMA partman TO partman;
GRANT ALL ON ALL TABLES IN SCHEMA partman TO partman;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA partman TO partman;
GRANT EXECUTE ON ALL PROCEDURES IN SCHEMA partman TO partman;  -- PG11+ only
GRANT ALL ON SCHEMA :db_schema TO partman;

GRANT CREATE ON DATABASE :db_name TO partman;

COMMIT;

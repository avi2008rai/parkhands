-- Deploy PH:extension_pg_stat_statements to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

COMMIT;

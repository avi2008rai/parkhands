-- Revert PH:extension_pg_stat_statements from pg

BEGIN;

DROP EXTENSION pg_stat_statements;

COMMIT;

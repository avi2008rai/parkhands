-- Verify PH:extension_pg_stat_statements on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'pg_stat_statements';

ROLLBACK;

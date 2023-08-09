-- Verify PH:extension_partman on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'pg_partman';

ROLLBACK;

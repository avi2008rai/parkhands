-- Verify PH:extension_cron on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'pg_cron';

ROLLBACK;

-- Verify PH:extension_timescaledb on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'timescaledb';

ROLLBACK;

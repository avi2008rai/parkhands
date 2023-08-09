-- Verify PH:extension_hashids on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'pg_hashids';

ROLLBACK;

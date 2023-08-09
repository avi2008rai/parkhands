-- Verify PH:extension_pgjwt on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'pgjwt';

ROLLBACK;

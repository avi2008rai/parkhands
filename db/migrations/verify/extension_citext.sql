-- Verify PH:extension_citext on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'citext';

ROLLBACK;

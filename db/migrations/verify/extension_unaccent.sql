-- Verify PH:extension_unaccent on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'unaccent';

ROLLBACK;

-- Verify PH:extension_btree_gist on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'btree_gist';

ROLLBACK;

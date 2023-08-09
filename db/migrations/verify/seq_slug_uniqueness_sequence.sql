-- Verify PH:seq_slug_uniqueness_sequence on pg

BEGIN;

  SELECT 1/COUNT(*)
    FROM pg_catalog.pg_namespace AS n
           JOIN pg_catalog.pg_class AS C ON n.oid = c.relnamespace
   WHERE
     n.nspname = 'util'
     AND c.relname = 'slug_uniqueness_sequence';

ROLLBACK;


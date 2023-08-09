-- Verify PH:seq_api_key on pg

BEGIN;

  SELECT 1/COUNT(*)
    FROM pg_catalog.pg_namespace AS n
    JOIN pg_catalog.pg_class AS C ON n.oid = c.relnamespace
    WHERE
      n.nspname = 'util'
      AND c.relname = 'api_key';

ROLLBACK;

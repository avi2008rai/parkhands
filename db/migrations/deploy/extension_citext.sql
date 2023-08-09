-- Deploy PH:extension_citext to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS "citext" WITH SCHEMA public;
COMMENT ON EXTENSION "citext" IS 'Case insensitive TEXT type';

COMMIT;

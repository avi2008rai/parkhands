-- Deploy PH:extension_postgis to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA public;
COMMENT ON EXTENSION "postgis" IS 'spatial database extender for PostgreSQL';

COMMIT;

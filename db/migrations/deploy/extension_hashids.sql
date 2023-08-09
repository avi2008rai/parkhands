-- Deploy PH:extension_hashids to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pg_hashids" WITH SCHEMA public;

COMMIT;

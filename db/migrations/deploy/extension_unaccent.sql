-- Deploy PH:extension_unaccent to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS "unaccent" WITH SCHEMA public;

COMMIT;

-- Deploy PH:extension_pgtap to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgtap" WITH SCHEMA public;

COMMIT;

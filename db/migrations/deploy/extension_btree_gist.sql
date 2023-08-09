-- Deploy PH:extension_btree_gist to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS "btree_gist" WITH SCHEMA public;

COMMIT;

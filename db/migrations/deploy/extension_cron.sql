-- Deploy PH:extension_cron to pg

BEGIN;

CREATE EXTENSION IF NOT EXISTS pg_cron;

COMMIT;

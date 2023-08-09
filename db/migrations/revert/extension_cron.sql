-- Revert PH:extension_cron from pg

BEGIN;

DROP EXTENSION pg_cron;

COMMIT;

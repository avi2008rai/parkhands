-- Revert PH:extension_timescaledb from pg

BEGIN;

DROP EXTENSION timescaledb;

COMMIT;

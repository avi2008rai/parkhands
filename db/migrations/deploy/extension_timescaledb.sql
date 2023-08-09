-- Deploy PH:extension_timescaledb to pg

BEGIN;

SET client_min_messages = error;

CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

RESET client_min_messages;

COMMIT;

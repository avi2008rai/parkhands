-- Deploy PH:table_secrets to pg
-- requires: schema_settings

BEGIN;

CREATE TABLE settings.secrets (
  KEY     TEXT PRIMARY KEY,
  VALUE   TEXT NOT NULL
);
COMMENT ON TABLE settings.secrets IS 'simple key => value settings store';

COMMIT;

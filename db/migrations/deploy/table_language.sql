-- Deploy PH:table_language to pg

BEGIN;

CREATE TABLE api.language (
  code      CHAR(2) PRIMARY KEY,
  name      TEXT NOT NULL,
  weight    INTEGER NOT NULL DEFAULT 0
);

COMMIT;

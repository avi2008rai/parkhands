-- Deploy PH:table_private_user to pg
-- requires: schema_private
-- requires: extension_uuid

BEGIN;

CREATE TABLE private.user (
  ID            UUID PRIMARY KEY REFERENCES api.user ON DELETE CASCADE,
  "password"    TEXT NOT NULL DEFAULT uuid_generate_v4()
);

COMMIT;

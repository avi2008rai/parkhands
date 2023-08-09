-- Deploy PH:table_private_api_token to pg
-- requires: schema_private
-- requires: extension_uuid

BEGIN;

CREATE TABLE private.api_token (
  api_key_id    UUID NOT NULL
                CONSTRAINT api_token_api_key_id_fk
                REFERENCES private.api_key
                ON DELETE CASCADE,
  api_token     TEXT NOT NULL,
  expire_at     BIGINT,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMIT;

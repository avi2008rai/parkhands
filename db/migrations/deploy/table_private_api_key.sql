-- Deploy PH:table_private_api_key to pg
-- requires: schema_private
-- requires: extension_uuid

BEGIN;

CREATE TABLE private.api_key (
  id            UUID PRIMARY KEY
                CONSTRAINT api_key_pkey
                DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL
                REFERENCES api.user
                ON DELETE CASCADE
                DEFAULT request.user_id(),
  api_key       TEXT NOT NULL,
  description   TEXT NOT NULL,
  expire_at     TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX api_key_unique_idx ON private.api_key (api_key);

CREATE TRIGGER trg_api_key_encrypt_api_key
  BEFORE INSERT OR UPDATE
  ON private.api_key
  FOR EACH ROW EXECUTE PROCEDURE auth.encrypt_api_key();

COMMIT;

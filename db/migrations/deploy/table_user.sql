-- Deploy PH:table_user to pg
-- requires: schema_api
-- requires: extension_uuid

BEGIN;

CREATE TABLE api.user (
  id                    UUID PRIMARY KEY
                        CONSTRAINT user_pkey
                        DEFAULT uuid_generate_v4(),
  name                  TEXT NOT NULL,
  email                 email NOT NULL,
  email_confirmed       BOOLEAN NOT NULL
                        DEFAULT FALSE,
  status                status_t NOT NULL
                        DEFAULT 'disabled'::status_t,
  role                  CITEXT NOT NULL
                        DEFAULT settings.get('auth.default-single-role')::citext,
  photo_url             TEXT,
  phone                 phone_us,
  address               JSON,
  settings              JSON,
  created_at            TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at            TIMESTAMPTZ,
  deleted               BOOLEAN NOT NULL DEFAULT FALSE,
  deleted_at            TIMESTAMPTZ,

  CHECK (length(name)>2)
);

CREATE INDEX user_role_idx
  ON api.user (role);

CREATE UNIQUE INDEX user_email_unique_idx
  ON api.user (email);

COMMENT ON COLUMN api.user.deleted IS 'handles soft delete';
COMMENT ON COLUMN api.user.deleted_at IS 'shows when is soft deleted';

COMMENT ON TABLE api.user IS E'@omit create,update';

COMMIT;

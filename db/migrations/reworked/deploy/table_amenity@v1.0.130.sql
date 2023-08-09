-- Deploy PH:table_amenity to pg
-- requires: schema_api

BEGIN;

  CREATE TABLE api.amenity (
    id            UUID PRIMARY KEY
                  DEFAULT uuid_generate_v4(),
    name          CITEXT NOT NULL,
    weight        INTEGER,
    description   TEXT,
    status        content_status_t NOT NULL
                  DEFAULT 'published'::content_status_t,
    created_at    TIMESTAMPTZ NOT NULL
                  DEFAULT now(),
    updated_at    TIMESTAMPTZ
  );

  CREATE UNIQUE INDEX amenity_name_unique_idx
    ON api.amenity (name)
    WHERE (status <> 'draft');

  CREATE TRIGGER trg_amenity_set_updated_at
    BEFORE UPDATE
    ON api.amenity
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

  COMMENT ON TRIGGER trg_amenity_set_updated_at ON api.amenity IS 'Sets updated_at column on TG_OP = UPDATE';

COMMIT;

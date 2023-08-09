-- Deploy PH:table_parking_space to pg
-- requires: table_user


BEGIN;

  CREATE TABLE api.parking_space (
    id                UUID PRIMARY KEY
                      CONSTRAINT parking_space_pkey
                      DEFAULT uuid_generate_v4(),
    owner_id          UUID NOT NULL
                      REFERENCES api.user
                      ON DELETE CASCADE
                      DEFAULT request.user_id(),
    name              TEXT NOT NULL,
    description       TEXT,
    photo_url         TEXT,
    settings          JSON,
    address           JSON,
    location          GEOGRAPHY(POINT,4326) NOT NULL,
    slug              TEXT CONSTRAINT parking_space_slug_ukey UNIQUE,
    created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at        TIMESTAMPTZ,

    CHECK (length(name)>2)
  );

  CREATE INDEX parking_space_location_gix ON api.parking_space USING GIST ( location );

  CREATE TRIGGER trg_parking_space_generate_slug_on_name
    BEFORE INSERT OR UPDATE
    ON api.parking_space
    FOR EACH ROW EXECUTE PROCEDURE util.generate_slug_on_name();

  CREATE TRIGGER trg_parking_space_set_updated_at
    BEFORE UPDATE
    ON api.parking_space
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

COMMIT;

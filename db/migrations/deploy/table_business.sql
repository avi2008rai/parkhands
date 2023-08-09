-- Deploy PH:table_business to pg
-- requires: table_user

BEGIN;

  CREATE TABLE api.business (
    id                UUID PRIMARY KEY
                      CONSTRAINT business_pkey
                      DEFAULT uuid_generate_v4(),
    owner_id          UUID NOT NULL
                      REFERENCES api.user
                      ON DELETE CASCADE
                      DEFAULT request.user_id(),
    name              TEXT NOT NULL,
    description       TEXT,
    photo_url         TEXT,
    marker_url        TEXT,
    address           JSON,
    location          GEOGRAPHY(POINT,4326) NOT NULL,
    slug              TEXT CONSTRAINT business_slug_ukey UNIQUE,
    created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at        TIMESTAMPTZ,

    CHECK (length(name)>2)
  );

  CREATE INDEX business_location_gix ON api.business USING GIST ( location );

  CREATE TRIGGER trg_business_generate_slug_on_name
    BEFORE INSERT OR UPDATE
    ON api.business
    FOR EACH ROW EXECUTE PROCEDURE util.generate_slug_on_name();

  CREATE TRIGGER trg_business_set_updated_at
    BEFORE UPDATE
    ON api.business
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();


COMMIT;

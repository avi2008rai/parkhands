-- Deploy PH:table_slot to pg
-- requires: schema_api

BEGIN;

  CREATE TABLE api.slot (
    id                UUID PRIMARY KEY
                      CONSTRAINT slot_pkey
                      DEFAULT uuid_generate_v4(),
    name              TEXT NOT NULL,
    owner_id          UUID NOT NULL
                      REFERENCES api.user
                      ON DELETE CASCADE
                      DEFAULT request.user_id(),
    vehicle_size_id   UUID NOT NULL
                      REFERENCES api.vehicle_size,
    address           JSON,
    timezone          TEXT NOT NULL DEFAULT 'Europe/Berlin',
    price_per_hour    NUMERIC NOT NULL,
    status            slot_status_t NOT NULL
                      DEFAULT 'enabled'::slot_status_t,
    photo_url         TEXT,
    description       TEXT,
    notes             TEXT,
    location          GEOGRAPHY(POINT,4326) NOT NULL,
    slug              TEXT,
    created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at        TIMESTAMPTZ,
    deleted           BOOLEAN NOT NULL DEFAULT FALSE,
    deleted_at        TIMESTAMPTZ,

    CHECK (length(name)>2)
  );

  CREATE UNIQUE INDEX slot_slug_unique_idx ON api.slot (slug);

  CREATE INDEX slot_location_gix ON api.slot USING GIST ( location );

  CREATE TRIGGER trg_slot_generate_slug_on_name
    BEFORE INSERT OR UPDATE
    ON api.slot
    FOR EACH ROW EXECUTE PROCEDURE util.generate_slug_on_name();

  CREATE TRIGGER trg_slot_set_updated_at
    BEFORE UPDATE
    ON api.slot
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

  CREATE TRIGGER trg_slot_soft_delete_record
    BEFORE DELETE
    ON api.slot
    FOR EACH ROW EXECUTE PROCEDURE util.soft_delete_record();

COMMIT;



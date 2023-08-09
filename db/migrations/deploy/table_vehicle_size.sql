-- Deploy PH:table_vehicle_size to pg
-- requires: schema_api

BEGIN;

  CREATE TABLE api.vehicle_size (
    id                UUID PRIMARY KEY
                      CONSTRAINT vehicle_size_pkey
                      DEFAULT uuid_generate_v4(),
    status            content_status_t NOT NULL
                      DEFAULT 'published'::content_status_t,
    name              CITEXT,
    weight            INTEGER NOT NULL DEFAULT 0,
    description       CITEXT,
    created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at        TIMESTAMPTZ
  );

  CREATE TRIGGER trg_vehicle_size_set_updated_at
    BEFORE UPDATE
    ON api.vehicle_size
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

COMMIT;

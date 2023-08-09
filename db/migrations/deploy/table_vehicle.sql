-- Deploy PH:table_vehicle to pg
-- requires: table_vehicle_type
-- requires: schema_api

BEGIN;

  CREATE TABLE api.vehicle (
    id                  UUID PRIMARY KEY
                        CONSTRAINT vehicle_pkey
                        DEFAULT uuid_generate_v4(),
    owner_id            UUID NOT NULL
                        REFERENCES api.user
                        ON DELETE CASCADE
                        DEFAULT request.user_id(),
    name                citext NOT NULL,
    license_plate       citext,
    vehicle_type_id     UUID NOT NULL
                        REFERENCES api.vehicle_type,
    vehicle_size_id     UUID NOT NULL
                        REFERENCES api.vehicle_size,
    status              status_t NOT NULL
                        DEFAULT 'enabled'::status_t,
    created_at          TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at          TIMESTAMPTZ
  );

  CREATE TRIGGER trg_vehicle_set_updated_at
    BEFORE UPDATE
    ON api.vehicle
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

COMMIT;

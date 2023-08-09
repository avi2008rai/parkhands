-- Deploy PH:table_vehicle_type to pg
-- requires: schema_api

BEGIN;

CREATE TABLE api.vehicle_type (
  id        UUID PRIMARY KEY
            CONSTRAINT vehicle_type_pkey
            DEFAULT uuid_generate_v4(),
  name      CITEXT NOT NULL
            CONSTRAINT vehicle_type_name_ukey UNIQUE,
  weight    INTEGER NOT NULL DEFAULT 0
);

COMMIT;

-- Deploy PH:table_slot_amenity to pg
-- requires: schema_api
-- requires: table_slot
-- requires: table_amenity

BEGIN;

  CREATE TABLE api.slot_amenity (
    id            UUID PRIMARY KEY
                  CONSTRAINT slot_amenity_pkey
                  DEFAULT uuid_generate_v4(),
    slot_id       UUID NOT NULL
                  REFERENCES api.slot
                  ON DELETE CASCADE,
    amenity_id    UUID NOT NULL
                  REFERENCES api.amenity
                  ON DELETE CASCADE
  );

  COMMENT ON TABLE api.slot_amenity IS E'@omit update';

COMMIT;

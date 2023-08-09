-- Deploy PH:table_slot_availability to pg
-- requires: table_slot

BEGIN;

  CREATE TABLE api.slot_availability (
    id                UUID PRIMARY KEY
                      CONSTRAINT slot_availability_pkey
                      DEFAULT uuid_generate_v4(),
    slot_id           UUID NOT NULL
                      REFERENCES api.slot
                      ON DELETE CASCADE,
    day_of_week       INTEGER NOT NULL,
    start_hour        TIME NOT NULL,
    end_hour          TIME NOT NULL,
    created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,

    CHECK(day_of_week BETWEEN 0 AND 6)
  );

COMMIT;

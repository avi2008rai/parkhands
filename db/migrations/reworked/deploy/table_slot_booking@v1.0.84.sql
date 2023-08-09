-- Deploy PH:table_slot_booking to pg
-- requires: table_slot
-- requires: table_user

BEGIN;

  CREATE TABLE timescale.slot_booking (
    id                UUID
                      DEFAULT uuid_generate_v4(),
    slot_id           UUID NOT NULL
                      REFERENCES api.slot
                      ON DELETE CASCADE,
    user_id           UUID NOT NULL
                      REFERENCES api.user
                      ON DELETE CASCADE,
    status            booking_status_t NOT NULL
                      DEFAULT 'pending'::booking_status_t,
    license_plate     CITEXT,
    start_time        TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_time          TIMESTAMPTZ NOT NULL,
    created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,

    PRIMARY KEY (id, start_time)
  );

  -- Gist index with exclude allows constraints between start_time, end_time and overlapping
  ALTER TABLE timescale.slot_booking
    ADD CONSTRAINT no_overlapping_timestamps
    EXCLUDE USING gist (
      slot_id WITH =,
      start_time WITH <>,
      tstzrange(start_time, end_time) WITH &&
    ) WHERE (status != 'canceled'::booking_status_t);

  SELECT create_hypertable('timescale.slot_booking', 'start_time');

COMMIT;

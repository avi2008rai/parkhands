-- Deploy PH:table_private_pg_event to pg
-- requires: schema_private

BEGIN;

CREATE TABLE private.pg_event
(
  ID            UUID NOT NULL DEFAULT uuid_generate_v4()
                CONSTRAINT pg_event_pkey PRIMARY KEY,
  event_key     TEXT NOT NULL,
  payload       JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;

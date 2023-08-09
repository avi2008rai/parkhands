-- Deploy PH:table_parking_space_availability to pg
-- requires: parking_space_availability

BEGIN;

CREATE TABLE api.parking_space_availability (
  id                                UUID PRIMARY KEY
                                    CONSTRAINT parking_space_availability_pkey
                                    DEFAULT uuid_generate_v4(),

  parking_space_id                  UUID NOT NULL
                                    REFERENCES api.parking_space
                                    ON DELETE CASCADE,

  from_date                          DATE NOT NULL,

  to_date                            DATE NOT NULL,

  default_flag                       BOOLEAN NOT NULL DEFAULT FALSE,
  closed_flag                        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                        TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at                        TIMESTAMPTZ,
  
  FOREIGN KEY (parking_space_id)    REFERENCES api.parking_space(id)
  
);

COMMIT;
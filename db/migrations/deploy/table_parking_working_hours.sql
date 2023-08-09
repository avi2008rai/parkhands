-- Deploy PH:table_parking_working_hours.sql to pg

BEGIN;

CREATE TABLE api.parking_working_hours (
    id                              UUID PRIMARY KEY
                                    CONSTRAINT parking_working_hr_pkey

                                    DEFAULT uuid_generate_v4(),

    parking_space_availability_id   UUID NOT NULL
                                    REFERENCES api.parking_space_availability
                                    ON DELETE CASCADE,

    day_of_week                     JSON NOT NULL,

    from_time                       TIME NOT NULL,

    to_time                         TIME NOT NULL,

    created_at                      TIMESTAMPTZ DEFAULT now() NOT NULL,

    updated_at                      TIMESTAMPTZ,

    FOREIGN KEY (parking_space_availability_id)    REFERENCES api.parking_space_availability(id)

);

COMMIT;

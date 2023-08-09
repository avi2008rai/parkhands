-- Deploy PH:table_parking_open_hours.sql to pg

BEGIN;

    CREATE TABLE api.parking_open_hours (
        id                              UUID PRIMARY KEY
                                        CONSTRAINT parking_open_hr_pkey
                                        DEFAULT uuid_generate_v4(),

        parking_space_availability_id   UUID NOT NULL
                                        REFERENCES api.parking_space_availability
                                        ON DELETE CASCADE,


        day_of_week                     JSON NOT NULL,

        from_time                       TIME NOT NULL,

        to_time                         TIME NOT NULL,

        price                           FLOAT NOT NULL,

        currency                        TEXT DEFAULT 'EUR', 

        created_at                      TIMESTAMPTZ DEFAULT now() NOT NULL,

        updated_at                      TIMESTAMPTZ,

        FOREIGN KEY (parking_space_availability_id)    REFERENCES api.parking_space_availability(id)

    );

COMMIT;



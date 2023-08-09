-- Verify PH:table_parking_space_availability.sql on pg

BEGIN;

    SELECT
        id
        , parking_space_id
        , from_date
        , to_date
        , default_flag
        , closed_flag
        , created_at
        , updated_at
    FROM api.parking_space_availability
        WHERE FALSE;

ROLLBACK;

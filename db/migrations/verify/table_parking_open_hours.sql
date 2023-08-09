-- Verify PH:table_parking_open_hours.sql on pg

BEGIN;

SELECT
        id
        , parking_space_availability_id
        , day_of_week
        , from_time
        , to_time
        , price
        , currency
        , created_at
        , updated_at
    FROM api.parking_open_hours
        WHERE FALSE;

ROLLBACK;

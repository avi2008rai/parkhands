-- Deploy PH:table_parking_space to pg
-- requires: table_user


BEGIN;

  ALTER TABLE api.parking_space
    DROP COLUMN car_entry,
    DROP COLUMN car_exit,
    DROP COLUMN company_entrance,
    DROP COLUMN parkingspace_mapview,
    DROP COLUMN brand_logo,
    DROP COLUMN working_hours,
    DROP COLUMN advt_link,
    DROP COLUMN blue_print,
    DROP COLUMN hidden_field,
    DROP COLUMN pedestrian_text,
    DROP COLUMN language_code,
    DROP COLUMN contributor_id,
    DROP COLUMN floor,
    DROP COLUMN category,
    DROP COLUMN status,
    DROP COLUMN verification_status,
    DROP COLUMN access_restriction;

COMMIT;

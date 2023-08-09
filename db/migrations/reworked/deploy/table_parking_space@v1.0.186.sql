-- Deploy PH:table_parking_space to pg
-- requires: table_user
-- requires: type_space_category 
-- requires: type_space_verification_status
-- requires: type_space_access_restriction
-- requires: type_parking_space_status


BEGIN;

  ALTER TABLE api.parking_space
    ADD COLUMN car_entry geometry(point,4326),
    ADD COLUMN car_exit geometry(Point,4326),
    ADD COLUMN company_entrance geometry(Point,4326),
    ADD COLUMN parkingspace_mapview GEOGRAPHY(Polygon,4326),
    ADD COLUMN brand_logo TEXT,
    ADD COLUMN working_hours json,
    ADD COLUMN advt_link TEXT,
    ADD COLUMN blue_print TEXT,
    ADD COLUMN hidden_field TEXT,
    ADD COLUMN pedestrian_text TEXT,
    ADD COLUMN language_code varchar(2),
    ADD COLUMN contributor_id uuid,
    ADD COLUMN floor smallint DEFAULT 1,
    ADD COLUMN category space_category DEFAULT 'private'::space_category,
    ADD COLUMN status parking_space_status DEFAULT 'enabled'::parking_space_status,
    ADD COLUMN verification_status space_verification_status DEFAULT 'verified'::space_verification_status,
    ADD COLUMN access_restriction space_access_restriction DEFAULT 'none'::space_access_restriction;

COMMIT;

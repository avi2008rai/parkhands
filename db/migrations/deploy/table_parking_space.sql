-- Deploy PH:table_parking_space to pg
-- requires: schema_api


BEGIN;
ALTER TABLE api.parking_space

ALTER COLUMN access_restriction DROP DEFAULT,
ALTER COLUMN access_restriction TYPE space_access_restriction ARRAY
USING ARRAY [ access_restriction ],
ALTER COLUMN access_restriction SET DEFAULT '{none}';

COMMIT;

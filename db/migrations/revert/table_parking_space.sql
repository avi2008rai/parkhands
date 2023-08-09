-- Deploy PH:table_parking_space to pg
-- requires: schema_api

BEGIN;

-- Warning reverting this change will inevitably lead to information loss!
ALTER TABLE api.parking_space

ALTER TABLE api.parking_space
ALTER COLUMN access_restriction DROP DEFAULT, 
ALTER COLUMN access_restriction TYPE space_access_restriction
USING access_restriction[1],
ALTER COLUMN access_restriction SET DEFAULT 'none'::space_access_restriction;

COMMIT;

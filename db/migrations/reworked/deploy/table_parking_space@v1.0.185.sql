-- Deploy PH:table_parking_space to pg
-- requires: table_user


BEGIN;

  ALTER TABLE api.parking_space
    ALTER COLUMN location DROP NOT NULL;

COMMIT;

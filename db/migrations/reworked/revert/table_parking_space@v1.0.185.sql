-- Deploy PH:table_parking_space to pg
-- requires: table_user


BEGIN;

  -- We cannot go back to previous state as
  -- the previous state allows NULL values

COMMIT;

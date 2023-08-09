-- Revert PH:table_parking_space from pg

BEGIN;

  DROP TABLE api.parking_space;

COMMIT;

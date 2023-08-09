-- Revert PH:table_amenity from pg

BEGIN;

  DROP TABLE api.amenity;

COMMIT;

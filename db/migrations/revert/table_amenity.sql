-- Revert PH:table_amenity from pg

BEGIN;
  DROP TRIGGER trg_amenity_generate_slug_on_name ON api.amenity;

  ALTER TABLE api.amenity DROP COLUMN slug;
COMMIT;

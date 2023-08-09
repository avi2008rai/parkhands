-- Deploy PH:table_amenity to pg
-- requires: schema_api

BEGIN;

ALTER TABLE api.amenity ADD COLUMN slug TEXT;

CREATE TRIGGER trg_amenity_generate_slug_on_name
  BEFORE INSERT OR UPDATE
  ON api.amenity
  FOR EACH ROW EXECUTE PROCEDURE util.generate_slug_on_name();

COMMIT;

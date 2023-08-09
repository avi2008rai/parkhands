-- Deploy PH:data_amenity to pg
-- requires: table_amenity

BEGIN;

  UPDATE api.amenity SET slug = util.slugify(name);

COMMIT;

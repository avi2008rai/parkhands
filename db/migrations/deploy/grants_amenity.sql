-- Deploy PH:grants_amenity to pg
-- requires: schema_api
-- requires: table_amenity

BEGIN;

GRANT SELECT ON api.amenity TO app_anonymous;

GRANT SELECT ON api.amenity TO base_single;

GRANT SELECT ON api.amenity TO base_super;
GRANT INSERT ON api.amenity TO base_super;
GRANT UPDATE ON api.amenity TO base_super;
GRANT DELETE ON api.amenity TO base_super;

COMMIT;

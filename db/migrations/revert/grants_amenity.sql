-- Revert PH:grants_amenity from pg

BEGIN;

REVOKE SELECT ON api.amenity FROM app_anonymous;
REVOKE SELECT ON api.amenity FROM base_single;

REVOKE SELECT ON api.amenity FROM base_super;
REVOKE INSERT ON api.amenity FROM base_super;
REVOKE UPDATE ON api.amenity FROM base_super;
REVOKE DELETE ON api.amenity FROM base_super;

COMMIT;

-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status
-- requires: type_geodata_provider

BEGIN;

  ALTER TABLE api.slot
    DROP COLUMN access_restrictions,
    DROP COLUMN business_status,
    DROP COLUMN business_status_reason,
    DROP COLUMN category,
    DROP COLUMN contributor_id,
    DROP COLUMN level,
    DROP COLUMN map_source,
    DROP COLUMN slot_dimensions,
    DROP COLUMN temp_unavailable,
    DROP COLUMN temp_unavailable_from,
    DROP COLUMN temp_unavailable_to,
    DROP COLUMN waypoints;

COMMIT;

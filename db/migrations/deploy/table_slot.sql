-- Deploy PH:table_slot to pg
-- requires: schema_api
-- requires: type_slot_verification_status
-- requires: type_geodata_provider
-- requires: type_slot_business_status
-- requires: type_access_restrictions

BEGIN;

  --TODO most fileds listed below need to be defined further before they can actually be implemented
  ALTER TABLE api.slot
    ADD COLUMN access_restrictions access_restrictions
               DEFAULT 'none'::access_restrictions,
    ADD COLUMN business_status slot_business_status 
               DEFAULT 'active'::slot_business_status,
    ADD COLUMN business_status_reason TEXT,
    ADD COLUMN category slot_category
               DEFAULT 'public'::slot_category,
    ADD COLUMN contributor_id UUID,
    ADD COLUMN level SMALLINT,
    ADD COLUMN map_source UUID
               DEFAULT '7d38d0b5-9453-4910-ab33-fa45974a09db',
    ADD CONSTRAINT fk_geodata_provider
        FOREIGN KEY (map_source)
        REFERENCES api.geodata_provider(ID),
    ADD COLUMN slot_dimensions JSON,
    ADD COLUMN temp_unavailable BOOLEAN DEFAULT 'false',
    ADD COLUMN temp_unavailable_from TIMESTAMPTZ,
    ADD COLUMN temp_unavailable_to   TIMESTAMPTZ,
    ADD COLUMN waypoints JSON;


COMMIT;

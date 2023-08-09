-- Deploy PH:table_geo_provider to pg

BEGIN;

CREATE TABLE api.geodata_provider (
  ID      UUID PRIMARY KEY
          CONSTRAINT geodata_provider_pkey DEFAULT uuid_generate_v4(),
  name    CITEXT NOT NULL
          CONSTRAINT geodata_provider_name_ukey UNIQUE,
  status  status_t NOT NULL
          DEFAULT 'enabled'::status_t
);

COMMIT;

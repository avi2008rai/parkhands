-- Deploy PH:table_country to pg
-- requires: schema_api

BEGIN;

CREATE TABLE api.country (
  ID      UUID PRIMARY KEY
          CONSTRAINT country_pkey DEFAULT uuid_generate_v4(),
  code    CITEXT NOT NULL
          CONSTRAINT country_code_ukey UNIQUE,
  name    CITEXT NOT NULL
          CONSTRAINT country_name_ukey UNIQUE,
  status  status_t NOT NULL
          DEFAULT 'enabled'::status_t
);

COMMIT;

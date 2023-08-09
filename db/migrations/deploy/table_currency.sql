-- Deploy PH:table_currency to pg

BEGIN;

CREATE TABLE api.currency (
  ID      UUID PRIMARY KEY
          CONSTRAINT currency_pkey DEFAULT uuid_generate_v4(),
  code    CITEXT NOT NULL
          CONSTRAINT currency_code_ukey UNIQUE,
  name    CITEXT NOT NULL
          CONSTRAINT currency_name_ukey UNIQUE,
  status  status_t NOT NULL
          DEFAULT 'enabled'::status_t
);

COMMIT;

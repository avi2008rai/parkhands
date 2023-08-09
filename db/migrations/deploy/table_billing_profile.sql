-- Deploy PH:table_billing_profile to pg
-- requires: table_user

BEGIN;

  CREATE TABLE api.billing_profile (
    id                    UUID PRIMARY KEY
                          CONSTRAINT billing_profile_pkey
                          DEFAULT uuid_generate_v4(),
    user_id               UUID NOT NULL
                          REFERENCES api.user
                          ON DELETE CASCADE,
    customer_id           TEXT,
    customer_obj          JSONB,
    billing_details       JSONB,
    created_at            TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at            TIMESTAMPTZ
  );

  COMMENT ON TABLE api.billing_profile IS E'@omit create';

  CREATE TRIGGER trg_billing_profile_set_updated_at
    BEFORE UPDATE
    ON api.billing_profile
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

COMMIT;

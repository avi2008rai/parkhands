-- Deploy PH:table_user_subscription to pg
-- requires: table_user
-- requires: table_billing_profile

BEGIN;

  CREATE TABLE api.user_subscription (
    id                    UUID PRIMARY KEY
                          CONSTRAINT user_subscription_pkey
                          DEFAULT uuid_generate_v4(),
    user_id               UUID NOT NULL
                          REFERENCES api.user
                          ON DELETE CASCADE
                          DEFAULT request.user_id(),
    billing_profile_id    UUID
                          REFERENCES api.billing_profile
                          ON DELETE SET NULL,
    plan_subscription_id  TEXT,
    status                subscription_status_t
                          DEFAULT 'unpaid'::subscription_status_t,
    ends_at               TIMESTAMPTZ NOT NULL,
    created_at            TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at            TIMESTAMPTZ
  );

  COMMENT ON TABLE api.user_subscription IS E'@omit create,update';

  CREATE TRIGGER trg_user_subscription_set_updated_at
    BEFORE UPDATE
    ON api.user_subscription
    FOR EACH ROW EXECUTE PROCEDURE util.set_updated_at();

  CREATE TRIGGER trg_update_user_role_on_subscription_change
    AFTER INSERT OR UPDATE ON api.user_subscription
    FOR EACH ROW
    EXECUTE PROCEDURE util.update_role_on_subscription();

COMMIT;



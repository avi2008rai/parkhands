-- Deploy PH:fn_create_subscription_wh to pg
-- requires: schema_util

BEGIN;

CREATE OR REPLACE FUNCTION util.create_subscription_wh()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
AS
$fn_block$
  DECLARE
    _billing_profile          api.billing_profile%ROWTYPE;
    _user_subscription        api.user_subscription%ROWTYPE;
    _sub_ends_at              TIMESTAMPTZ DEFAULT to_timestamp(
                              (NEW.payload->'data'->'object'->>'current_period_end')::INTEGER);
    _sub_id                   TEXT DEFAULT NEW.payload->'data'->'object'->>'id';
    _sub_status               subscription_status_t DEFAULT NEW.payload->'data'->'object'->>'status';
  BEGIN

    SELECT INTO _billing_profile
      abp.*
    FROM api.billing_profile abp
    WHERE abp.customer_id = NEW.customer;

    IF _billing_profile.id IS NULL THEN
      RAISE EXCEPTION 'billing_profile_missing' USING ERRCODE = 'BP404';
    END IF;

    SELECT INTO _user_subscription
      aus.*
    FROM api.user_subscription aus
    LEFT JOIN api.billing_profile abp
      ON abp.customer_id = NEW.customer
    WHERE aus.plan_subscription_id = _sub_id;

    IF _user_subscription.id IS NULL THEN
      INSERT INTO api.user_subscription
        (user_id, billing_profile_id, plan_subscription_id, status, ends_at)
      VALUES (
        _billing_profile.user_id
        , _billing_profile.id
        , _sub_id
        , _sub_status
        , _sub_ends_at
      ) RETURNING * INTO _user_subscription;
    ELSE
      UPDATE api.user_subscription SET
        ends_at = _sub_ends_at,
        status = _sub_status
      WHERE id = _user_subscription.id
      RETURNING * INTO _user_subscription;
    END IF;

    RETURN NEW;
  END;
$fn_block$;

REVOKE ALL PRIVILEGES ON FUNCTION util.create_subscription_wh() FROM PUBLIC;

COMMIT;

-- Deploy PH:fn_me to pg
-- requires: schema_api
-- requires: table_user
-- requires: fn_user_id
-- requires: fn_settings_get

BEGIN;

CREATE OR REPLACE FUNCTION api.me()
  RETURNS JSON
  SECURITY DEFINER
  LANGUAGE PLPGSQL STABLE
  SET search_path TO PUBLIC, api
  AS $$
DECLARE
  usr                   record;
  billing_profile       record;
  user_subscriptions    record;
  result                JSON;
BEGIN

  PERFORM public.session_check();

  SELECT
    au.*
    FROM api.user AS au
    WHERE NOT au.deleted
      AND au.id = request.user_id()
      AND (au.status = 'enabled' OR au.status = 'pending')
    INTO usr;

  IF usr.id IS NULL THEN
      RAISE EXCEPTION 'Invalid token' USING ERRCODE = 'RT404';
  END IF;

  SELECT
    abp.id
    , abp.customer_id
    , abp.billing_details
    , abp.created_at
    , abp.updated_at
  INTO billing_profile
    FROM api.billing_profile abp
    WHERE user_id = usr.id;

  SELECT
    aus.id
    , aus.billing_profile_id
    , aus.plan_subscription_id
    , aus.status
    , aus.ends_at
    , aus.created_at
    , aus.updated_at
  INTO user_subscriptions
    FROM api.user_subscription aus
    WHERE user_id = usr.id;

  -- fill composite type user_t from json to reduce exposed fields
  -- and then convert composite type into json again to return
  result := row_to_json(json_populate_record(null::public.user_t, row_to_json(usr)));

  result := result::jsonb || jsonb_build_object(
    'billing_profile', row_to_json(billing_profile),
    'user_subscriptions', row_to_json(user_subscriptions)
  );

  RETURN result;
END $$;

REVOKE ALL PRIVILEGES ON FUNCTION api.me() FROM public;

-- set grants
GRANT EXECUTE ON FUNCTION api.me() TO base_single;

COMMIT;

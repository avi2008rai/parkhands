-- Deploy PH:fn_soft_delete_user to pg
-- requires: schema_util
-- requires: fn_settings_get
-- requires: table_user

BEGIN;

CREATE OR REPLACE FUNCTION util.soft_delete_user()
  RETURNS TRIGGER
  SECURITY DEFINER
  LANGUAGE PLPGSQL
AS $trg_fn_block$
  DECLARE
    _anon_email         TEXT DEFAULT MD5(random()::text) || '@example.anon';
    _anon_name          TEXT DEFAULT 'anonymous';
    _fuser_json         JSON;
    _stripe_subs        JSON;
  BEGIN
    -- admin deletion prohibited
    IF (old.role = 'app_super_admin') THEN
      RETURN NULL;
    END IF;

    -- Update user model / scramble email
    UPDATE api.user
      SET deleted = TRUE
      , deleted_at = now()
      , email = _anon_email
      , name = _anon_name
      , photo_url = NULL
    WHERE id = old.id;

    -- trigger soft-delete of connected slots
    DELETE FROM api.slot
    WHERE owner_id = old.id;

    -- emit cancel subscriptions event / handle by organic
    SELECT into _stripe_subs json_agg(aus.*)
      FROM api.user_subscription aus
    WHERE aus.user_id = old.id
      AND aus.status = 'active'::subscription_status_t;

    _fuser_json := json_build_object(
      'user', row_to_json(old),
      'stripe_subs', _stripe_subs
    );

    -- delete all vehicles
    DELETE FROM api.vehicle
    WHERE owner_id = old.id;

    -- Remove api keys
    DELETE FROM private.api_key
    WHERE user_id = old.id;

    PERFORM util.pg_event_send('user.cancel_subscriptions', _fuser_json);

    RETURN NULL;
  END;
$trg_fn_block$;

COMMIT;

-- Verify PH:table_user_subscription on pg

BEGIN;

  SELECT
    id
    , user_id
    , billing_profile_id
    , plan_subscription_id
    , status
    , ends_at
    , created_at
    , updated_at
  FROM api.user_subscription
    WHERE FALSE;

  SELECT 2/COUNT(*)
    FROM pg_trigger
    WHERE tgname IN (
      'trg_user_subscription_set_updated_at'
      ,'trg_update_user_role_on_subscription_change'
    );

ROLLBACK;

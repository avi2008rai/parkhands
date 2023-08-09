-- Verify PH:table_billing_profile on pg

BEGIN;

  SELECT
    id
    , user_id
    , customer_id
    , customer_obj
    , billing_details
    , created_at
    , updated_at
  FROM api.billing_profile
    WHERE FALSE;

  SELECT 1/COUNT(*)
    FROM pg_trigger
    WHERE tgname IN (
      'trg_billing_profile_set_updated_at'
    );

ROLLBACK;

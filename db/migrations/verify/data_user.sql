-- Verify PH:data_user on pg

BEGIN;

SELECT 1/( 2 = COUNT(*) )::INTEGER
  FROM api.billing_profile
  WHERE user_id IN (
    'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09',
    'e4535745-ff95-4af4-bad1-9d649d506d2f'
  );

ROLLBACK;

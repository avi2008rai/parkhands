BEGIN;

INSERT INTO api.user (
  id,
  name,
  email,
  status,
  role
) VALUES (
  'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09',
  'test_super_admin',
  'test_super_admin@parkhands.de',
  'enabled',
  'app_super_admin'
)
ON CONFLICT (email) DO NOTHING;

UPDATE private.user
  SET password = '12345678'
WHERE id = 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09';

INSERT INTO api.user (
  id,
  name,
  email,
  status,
  role
) VALUES (
  'e4535745-ff95-4af4-bad1-9d649d506d2f',
  'test_single_member',
  'test_single_member@parkhands.de',
  'enabled',
  'app_single_member'
)
ON CONFLICT (email) DO NOTHING;

UPDATE private.user
  SET password = '12345678'
WHERE id = 'e4535745-ff95-4af4-bad1-9d649d506d2f';

INSERT INTO api.user (
  id,
  name,
  email,
  status,
  role
) VALUES (
  'e16732de-75f9-4c78-bbe8-bdcfd622d50c',
  'test_provider',
  'test_provider@parkhands.de',
  'enabled',
  'app_provider'
)
ON CONFLICT (email) DO NOTHING;

UPDATE private.user
  SET password = '12345678'
WHERE id = 'e16732de-75f9-4c78-bbe8-bdcfd622d50c';

INSERT INTO api.user (
  id,
  name,
  email,
  status,
  role
) VALUES (
  'b53f5345-c784-4f05-bc65-9ab205dccf09',
  'test_provider_premium',
  'test_provider_premium@parkhands.de',
  'enabled',
  'app_provider_premium'
)
ON CONFLICT (email) DO NOTHING;

UPDATE private.user
  SET password = '12345678'
WHERE id = 'b53f5345-c784-4f05-bc65-9ab205dccf09';

INSERT INTO api.billing_profile (
  id,
  user_id,
  customer_id,
  billing_details
) VALUES (
  'b1d2c2dd-c5c5-4781-9bc5-9aa79e6f3b14',
  'b53f5345-c784-4f05-bc65-9ab205dccf09',
  'stripe_customer_id',
  '{}'
);

INSERT INTO api.user_subscription (
  id,
  user_id,
  billing_profile_id,
  status,
  ends_at
) VALUES (
  'f04c639b-2daf-4c7a-a44a-a5c823b028cb',
  'b53f5345-c784-4f05-bc65-9ab205dccf09',
  'b1d2c2dd-c5c5-4781-9bc5-9aa79e6f3b14',
  'active',
  (now() + '30 days')
);

COMMIT;

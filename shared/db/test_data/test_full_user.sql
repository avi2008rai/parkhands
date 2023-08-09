INSERT INTO api.user (
  id,
  name,
  email,
  status,
  role
) VALUES (
  '3074ce03-041a-4f14-9371-a01c0ecb6c13',
  'test_full_user',
  'test_full_user@parkhands.de',
  'enabled',
  'app_provider_premium'
);

UPDATE private.user
  SET password = '12345678'
WHERE id = '3074ce03-041a-4f14-9371-a01c0ecb6c13';

INSERT INTO api.slot (
  id,
  owner_id,
  vehicle_size_id,
  name,
  price_per_hour,
  location,
  timezone
) VALUES (
  'd94dcfb2-7364-4bd0-a17e-95fdd4d44b5f',
  '3074ce03-041a-4f14-9371-a01c0ecb6c13',
  (SELECT id FROM api.vehicle_size LIMIT 1),
  'Beach',
  10,
  'SRID=4326;POINT(-6.079346 35.159754)',
  'Europe/London'
);

INSERT INTO api.vehicle (
  id,
  owner_id,
  name,
  vehicle_size_id,
  vehicle_type_id
) VALUES (
  '95f7bcc5-44e4-4c97-bfa3-dfe64fed8d0a',
  '3074ce03-041a-4f14-9371-a01c0ecb6c13',
  'Lada Niva',
  (SELECT id FROM api.vehicle_size LIMIT 1),
  (SELECT id FROM api.vehicle_type LIMIT 1)
);

INSERT INTO private.api_key (
  id,
  user_id,
  api_key,
  description
) VALUES (
  '7194c482-da99-44cc-9f67-a7aea45e99f6',
  '3074ce03-041a-4f14-9371-a01c0ecb6c13',
  'lada_niva',
  'lada_niva'
);

INSERT INTO api.billing_profile (
  id,
  user_id,
  customer_id,
  billing_details
) VALUES (
  'f3003e30-fb61-46af-93d4-eda1e5f2d980',
  '3074ce03-041a-4f14-9371-a01c0ecb6c13',
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
  '6c231e7a-b95a-466e-b678-092b277495d1',
  '3074ce03-041a-4f14-9371-a01c0ecb6c13',
  'f3003e30-fb61-46af-93d4-eda1e5f2d980',
  'active',
  (now() + '30 days')
);

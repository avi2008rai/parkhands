-- Deploy PH:data_user to pg
-- requires: table_user

BEGIN;

INSERT INTO api.user (
  id,
  name,
  email,
  status,
  role
) VALUES (
  'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09',
  'Super Admin',
  'super_admin@parkhands.de',
  'enabled',
  'app_super_admin'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO private.user (
   id,
   password
) VALUES (
  'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09',
  '12345678'
);

INSERT INTO api.user (
  id,
  name,
  email,
  status,
  role
) VALUES (
  'e4535745-ff95-4af4-bad1-9d649d506d2f',
  'Single Member',
  'single_member@parkhands.de',
  'enabled',
  'app_single_member'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO private.user (
   id,
   password
) VALUES (
  'e4535745-ff95-4af4-bad1-9d649d506d2f',
  '12345678'
);

COMMIT;

-- Deploy PH:type_user to pg
-- requires: schema_api
-- requires: type_status
-- requires: domain_phone_us

BEGIN;

CREATE TYPE public.user_t AS (
  id UUID
  , name TEXT
  , email TEXT
  , photo_url TEXT
  , phone phone_us
	, role TEXT
  , status public.status_t
  , settings JSON
  , address JSON
);
COMMENT ON TYPE public.user_t IS 'Partial information for user object';

COMMIT;

-- Deploy PH:type_jwt_token to pg

BEGIN;

CREATE TYPE public.jwt_token AS (
	role TEXT
	, id UUID
	, exp INTEGER
);

COMMENT ON TYPE public.jwt_token IS 'payload for JWT token';

COMMIT;

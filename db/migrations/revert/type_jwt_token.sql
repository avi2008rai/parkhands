-- Revert PH:type_jwt_token from pg

BEGIN;

DROP TYPE public.jwt_token;

COMMIT;

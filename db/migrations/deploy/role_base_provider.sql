-- Deploy PH:role_base_provider to pg

BEGIN;

-- this is an application level role
CREATE ROLE base_provider;

COMMENT ON ROLE base_provider IS 'base_provider application level base role';

COMMIT;

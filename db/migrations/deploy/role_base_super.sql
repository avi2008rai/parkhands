-- Deploy PH:role_base_super to pg

BEGIN;

-- this is an application level role
CREATE ROLE base_super;
COMMENT ON ROLE base_super IS 'base_super application level base role';

COMMIT;

-- Deploy PH:role_base_single to pg

BEGIN;

-- this is an application level role
CREATE ROLE base_single;
COMMENT ON ROLE base_single IS 'base_single application level base role';

COMMIT;

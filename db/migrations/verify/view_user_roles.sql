-- Verify PH:view_user_roles on pg

BEGIN;

SELECT
  id
  , name
  , scope
  , memberof
  , ui
  FROM api.user_roles
    WHERE FALSE;

ROLLBACK;

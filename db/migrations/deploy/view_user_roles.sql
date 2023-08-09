-- Deploy PH:view_user_roles to pg
-- requires: schema_api

BEGIN;

CREATE OR REPLACE VIEW api.user_roles (
  id
  , name
  , scope
  , memberof
  , ui
  ) AS

  WITH app_roles AS (
    SELECT
      r.rolname
      , ARRAY(SELECT b.rolname
              FROM pg_catalog.pg_roles b
              WHERE pg_catalog.pg_has_role(r.oid, b.oid, 'member')
              ORDER by rolname ASC) as memberof
      , regexp_replace(r.rolname, 'app_', '') as displayname
    FROM pg_catalog.pg_roles r
    WHERE r.rolname ~ '^app_'
      AND r.rolname != 'app_anonymous'
    ORDER BY 1
  )
  SELECT
    r.rolname
    , initcap(regexp_replace(r.displayname, '_', ' ', 'g')) as name
    , regexp_match(r.displayname, '^[^_]+(?=_)') as scope
    , r.memberof
    , CASE WHEN ( -- flag with exception for these roles
        r.rolname = 'app_content_manager')
      THEN FALSE
      ELSE TRUE
      END as ui
  FROM app_roles r;

COMMIT;

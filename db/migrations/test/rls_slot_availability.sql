BEGIN;

SELECT    plan(1);

  PREPARE get_rls (TEXT, TEXT) AS
    WITH tbl_info AS (
      SELECT c.oid
        FROM pg_catalog.pg_class AS c
               LEFT JOIN pg_catalog.pg_namespace AS n
                   ON n.oid = c.relnamespace
       WHERE c.relname = $1
         AND n.nspname = $2
    )
    SELECT
    pol.polname AS rls_name
    , (CASE
       WHEN pol.polroles = '{0}' THEN NULL
       ELSE pg_catalog.array_to_string(
         ARRAY(
           SELECT rolname
             FROM pg_catalog.pg_roles
            WHERE oid = ANY (pol.polroles)
            ORDER BY 1
         ),',') END) AS rls_for_roles
    , (CASE pol.polcmd
       WHEN 'r' THEN 'SELECT'
       WHEN 'a' THEN 'INSERT'
       WHEN 'w' THEN 'UPDATE'
       WHEN 'd' THEN 'DELETE'
       END) AS rls_for_command
    , pg_catalog.pg_get_expr(pol.polqual, pol.polrelid) AS rls_using
    , pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid) AS rls_with_check
    FROM pg_catalog.pg_policy AS pol,
    tbl_info
    WHERE pol.polrelid = tbl_info.oid;


  SELECT set_eq(
    $$ EXECUTE get_rls('slot_availability', 'api') $$
    , $val$ VALUES
    (
      'crud_any_rows'
      , NULL
      , NULL
      , $$pg_has_role((request.user_role())::name, 'base_super'::name, 'MEMBER'::text)$$::TEXT
      , NULL
    )
    , (
      'crud_own_rows'
      , NULL
      , NULL
      , $$(slot_id IN ( SELECT slot.id
   FROM api.slot
  WHERE (slot.owner_id = request.user_id())))$$::TEXT
      , NULL
    )
    , (
      'select_enabled_rows'
      , NULL
      , 'SELECT'
      , $$(slot_id IN ( SELECT slot.id
   FROM api.slot
  WHERE ((slot.status = 'enabled'::slot_status_t) AND (NOT slot.deleted))))$$::TEXT
      , NULL
    )
    $val$
  );

  SELECT    finish();

ROLLBACK;

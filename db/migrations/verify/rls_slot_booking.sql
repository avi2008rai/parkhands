-- Verify PH:rls_slot_booking on pg

BEGIN;

  WITH tbl_info AS (
    SELECT c.oid
      FROM pg_catalog.pg_class AS c
             LEFT JOIN pg_catalog.pg_namespace AS n
                 ON n.oid = c.relnamespace
     WHERE c.relname = 'slot_booking'
       AND n.nspname = 'timescale'
  )
  SELECT 1 / (3 = COUNT(*))::INTEGER
    FROM pg_catalog.pg_policy AS pol,
         tbl_info
   WHERE pol.polrelid = tbl_info.oid;

  WITH tbl_info AS (
    SELECT c.oid
      FROM pg_catalog.pg_class AS c
             LEFT JOIN pg_catalog.pg_namespace AS n
                 ON n.oid = c.relnamespace
     WHERE c.relname = 'slot_booking'
       AND n.nspname = 'timescale'
  ),
    crud_any_rows AS (
      SELECT COUNT(*) AS i
        FROM pg_catalog.pg_policy AS pol,
             tbl_info
       WHERE pol.polrelid = tbl_info.oid
         AND (pol.polname
              = 'crud_any_rows'    -- policy name
         )

         AND ((CASE
               WHEN pol.polroles = '{0}' THEN NULL
               ELSE pg_catalog.array_to_string(
                 ARRAY(
                   SELECT rolname
                     FROM pg_catalog.pg_roles
                    WHERE oid = ANY (pol.polroles)
                    ORDER BY 1
                 ),',') END)
                 IS NULL            -- policy is for roles
         )

         AND ((CASE pol.polcmd
               WHEN 'r' THEN 'SELECT'
               WHEN 'a' THEN 'INSERT'
               WHEN 'w' THEN 'UPDATE'
               WHEN 'd' THEN 'DELETE'
               END)
               IS NULL              -- policy is for command
         )

         AND (pg_catalog.pg_get_expr(pol.polqual, pol.polrelid) =
              $$pg_has_role((request.user_role())::name, 'base_super'::name, 'MEMBER'::text)$$::TEXT
         )                          -- policy using expression ---^

         AND (pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid)
              IS NULL
         )                          -- policy check expression ---^
    ),
    crud_slot_owner_rows AS (
      SELECT COUNT(*) AS i
        FROM pg_catalog.pg_policy AS pol,
             tbl_info
       WHERE pol.polrelid = tbl_info.oid
         AND (pol.polname
              = 'crud_slot_owner_rows'    -- policy name
         )

         AND ((CASE
               WHEN pol.polroles = '{0}' THEN NULL
               ELSE pg_catalog.array_to_string(
                 ARRAY(
                   SELECT rolname
                     FROM pg_catalog.pg_roles
                    WHERE oid = ANY (pol.polroles)
                    ORDER BY 1
                 ),',') END)
                 IS NULL            -- policy is for roles
         )

         AND ((CASE pol.polcmd
               WHEN 'r' THEN 'SELECT'
               WHEN 'a' THEN 'INSERT'
               WHEN 'w' THEN 'UPDATE'
               WHEN 'd' THEN 'DELETE'
               END)
               IS NULL              -- policy is for command
         )

         AND (pg_catalog.pg_get_expr(pol.polqual, pol.polrelid) =
              $$(slot_id IN ( SELECT slot.id
   FROM api.slot
  WHERE ((slot.owner_id = request.user_id()) AND (NOT slot.deleted))))$$::TEXT
         )                          -- policy using expression ---^

         AND (pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid)
              IS NULL
         )                          -- policy check expression ---^
    ),
    crud_own_rows AS (
      SELECT COUNT(*) AS i
        FROM pg_catalog.pg_policy AS pol,
             tbl_info
       WHERE pol.polrelid = tbl_info.oid
         AND (pol.polname
              = 'crud_own_rows'    -- policy name
         )

         AND ((CASE
               WHEN pol.polroles = '{0}' THEN NULL
               ELSE pg_catalog.array_to_string(
                 ARRAY(
                   SELECT rolname
                     FROM pg_catalog.pg_roles
                    WHERE oid = ANY (pol.polroles)
                    ORDER BY 1
                 ),',') END)
                 IS NULL            -- policy is for roles
         )

         AND ((CASE pol.polcmd
               WHEN 'r' THEN 'SELECT'
               WHEN 'a' THEN 'INSERT'
               WHEN 'w' THEN 'UPDATE'
               WHEN 'd' THEN 'DELETE'
               END)
               IS NULL              -- policy is for command
         )

         AND (pg_catalog.pg_get_expr(pol.polqual, pol.polrelid) =
              $$(user_id = request.user_id())$$::TEXT
         )                          -- policy using expression ---^

         AND (pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid)
              IS NULL
         )                          -- policy check expression ---^
    )

  SELECT 1 / (3 = (
    crud_any_rows.i +
    crud_slot_owner_rows.i +
    crud_own_rows.i
  ))::INTEGER
    FROM crud_any_rows,
         crud_slot_owner_rows,
         crud_own_rows;

ROLLBACK;

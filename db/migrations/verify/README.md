## RLS verify helper

1. Create prepared statement

```sql
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
```

2. Run it passing `table_name` and `schema`

```sql
EXECUTE get_rls('table_name', 'api');
```

3. Copy relevant parts into `verify` script
4. Enjoy

---

Tips:

- Set `\pset format unaligned` in docker psql when you want to extract rls statement for `USING` and `WITH CHECK`, also for better view on the statements `\x`

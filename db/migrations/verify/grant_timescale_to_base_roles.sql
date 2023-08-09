-- Verify PH:grant_timescale_to_base_roles on pg

DO $$
DECLARE
  r_schema TEXT := 'timescale';
  r_anon TEXT := 'app_anonymous';
  r_single TEXT := 'base_single';
  r_super TEXT := 'base_super';
BEGIN

  ASSERT (SELECT NOT has_schema_privilege('public', r_schema, 'usage'));
  ASSERT (SELECT NOT has_schema_privilege(r_anon, r_schema, 'usage'));
  ASSERT (SELECT has_schema_privilege(r_single, r_schema, 'usage'));
  ASSERT (SELECT has_schema_privilege(r_super, r_schema, 'usage'));

END $$;

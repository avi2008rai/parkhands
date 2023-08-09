-- Verify PH:grant_api_to_all_roles on pg

DO $$
BEGIN

  ASSERT (SELECT has_schema_privilege('app_anonymous'
    , 'api', 'usage'));
  ASSERT (SELECT has_schema_privilege('base_single'
    , 'api', 'usage'));
  ASSERT (SELECT has_schema_privilege('base_provider'
    , 'api', 'usage'));

END $$;

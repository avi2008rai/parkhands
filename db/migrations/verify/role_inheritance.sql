-- Verify PH:role_inheritance on pg

DO $$
BEGIN

-- app_super_admin
ASSERT (SELECT pg_catalog.pg_has_role('app_super_admin', 'base_super', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_super_admin', 'base_provider', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_super_admin', 'base_single', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_super_admin', 'app_provider_premium', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_super_admin', 'app_provider', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_super_admin', 'app_single_member', 'MEMBER'));

--- app_provider_premium
ASSERT (SELECT pg_catalog.pg_has_role('app_provider_premium', 'base_provider', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_provider_premium', 'base_single', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_provider_premium', 'app_provider', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_provider_premium', 'app_single_member', 'MEMBER'));

--- app_provider
ASSERT (SELECT pg_catalog.pg_has_role('app_provider', 'base_provider', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_provider', 'base_single', 'MEMBER'));
ASSERT (SELECT pg_catalog.pg_has_role('app_provider', 'app_single_member', 'MEMBER'));

-- app_single_member
ASSERT (SELECT pg_catalog.pg_has_role('app_single_member', 'base_single', 'MEMBER'));

-- base_super
ASSERT (SELECT pg_catalog.pg_has_role('base_super', 'base_provider', 'MEMBER'));

-- base_provider
ASSERT (SELECT pg_catalog.pg_has_role('base_provider', 'base_single', 'MEMBER'));

-- base_single

END $$;

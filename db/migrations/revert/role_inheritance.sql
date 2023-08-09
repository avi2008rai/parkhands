-- Revert PH:role_inheritance to pg

BEGIN;

--- Single inheritance branch
REVOKE base_single FROM base_super;
REVOKE base_single FROM app_single_member;

--- Provider inheritance branch
REVOKE base_single FROM base_provider;
REVOKE base_provider FROM base_super;
REVOKE base_provider FROM app_provider;
REVOKE app_single_member FROM app_provider;
REVOKE app_provider FROM app_provider_premium;

--- Super inheritance branch
REVOKE base_super FROM app_super_admin;
REVOKE app_provider_premium FROM app_super_admin;

COMMIT;

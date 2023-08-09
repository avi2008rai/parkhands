-- Deploy PH:role_inheritance to pg

BEGIN;

--- Single inheritance branch
GRANT base_single TO base_super;
GRANT base_single TO app_single_member;

--- Provider inheritance branch
GRANT base_single TO base_provider;
GRANT base_provider TO base_super;
GRANT base_provider TO app_provider;
GRANT app_single_member TO app_provider;
GRANT app_provider TO app_provider_premium;

--- Super inheritance branch
GRANT base_super TO app_super_admin;
GRANT app_provider_premium TO app_super_admin;

COMMIT;

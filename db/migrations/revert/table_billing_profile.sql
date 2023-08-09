-- Revert PH:table_billing_profile from pg

BEGIN;

  DROP TABLE api.billing_profile;

COMMIT;

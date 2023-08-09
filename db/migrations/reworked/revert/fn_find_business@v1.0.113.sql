-- Revert PH:fn_find_business from pg

BEGIN;

  DROP FUNCTION IF EXISTS api.find_business(api.find_business_input);
  DROP TYPE IF EXISTS api.find_business_input;
  DROP TYPE IF EXISTS api.find_business_result;

COMMIT;

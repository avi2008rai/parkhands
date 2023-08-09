-- Deploy PH:grants_billing_profile to pg
-- requires: table_billing_profile

BEGIN;

  GRANT SELECT ON api.billing_profile TO base_single;
  GRANT DELETE ON api.billing_profile TO base_single;

  GRANT UPDATE (
    customer_id
    , customer_obj
    , billing_details
  ) ON api.billing_profile TO base_single;

  GRANT SELECT ON api.billing_profile TO base_super;
  GRANT INSERT ON api.billing_profile TO base_super;
  GRANT UPDATE ON api.billing_profile TO base_super;
  GRANT DELETE ON api.billing_profile TO base_super;

COMMIT;

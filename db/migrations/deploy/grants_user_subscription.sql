-- Deploy PH:grants_user_subscription to pg
-- requires: table_user_subscription

BEGIN;

  GRANT SELECT ON api.user_subscription TO base_single;
  GRANT DELETE ON api.user_subscription TO base_single;

  GRANT SELECT ON api.user_subscription TO base_super;
  GRANT INSERT ON api.user_subscription TO base_super;
  GRANT UPDATE ON api.user_subscription TO base_super;
  GRANT DELETE ON api.user_subscription TO base_super;

COMMIT;

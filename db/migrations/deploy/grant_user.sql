-- Deploy PH:grant_user to pg
-- requires: table_user

BEGIN;

GRANT SELECT ON api.user TO app_anonymous;

GRANT SELECT ON api.user TO base_single;
GRANT INSERT ON api.user TO base_single;
GRANT UPDATE ON api.user TO base_single;
GRANT DELETE ON api.user TO base_single;

COMMIT;

-- Deploy PH:grant_country to pg
-- requires: table_country

BEGIN;

GRANT SELECT ON api.country TO app_anonymous;
GRANT SELECT ON api.country TO base_single;

GRANT SELECT ON api.country TO base_super;
GRANT INSERT ON api.country TO base_super;
GRANT UPDATE ON api.country TO base_super;
GRANT DELETE ON api.country TO base_super;

COMMIT;

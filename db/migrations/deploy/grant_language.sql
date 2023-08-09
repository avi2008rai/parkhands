-- Deploy PH:grant_language to pg
-- requires: table_language

BEGIN;

GRANT SELECT ON api.language TO app_anonymous;
GRANT SELECT ON api.language TO base_single;

GRANT SELECT ON api.language TO base_super;
GRANT INSERT ON api.language TO base_super;
GRANT UPDATE ON api.language TO base_super;
GRANT DELETE ON api.language TO base_super;

COMMIT;

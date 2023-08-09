-- Deploy PH:grants_translation to pg
-- requires: table_translation

BEGIN;

GRANT SELECT ON api.translation TO app_anonymous;
GRANT SELECT ON api.translation TO base_single;

GRANT SELECT ON api.translation TO base_super;
GRANT INSERT ON api.translation TO base_super;
GRANT UPDATE ON api.translation TO base_super;
GRANT DELETE ON api.translation TO base_super;

COMMIT;

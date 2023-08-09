-- Deploy PH:data_user to pg
-- requires: table_user

BEGIN;

INSERT INTO api.billing_profile (user_id) VALUES ('fbc0cc53-602b-4ab6-b65a-fe8e60c57a09');
INSERT INTO api.billing_profile (user_id) VALUES ('e4535745-ff95-4af4-bad1-9d649d506d2f');

COMMIT;

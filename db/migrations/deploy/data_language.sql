-- Deploy PH:data_language to pg

BEGIN;

INSERT INTO api.language (code, name, weight)
VALUES  ('de', 'Deutsch', 1),
        ('en', 'English', 2);

COMMIT;

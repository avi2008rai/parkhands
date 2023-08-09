BEGIN;

  SELECT plan(1);

  SELECT set_eq(
    $$ SELECT * FROM api.language $$
    , $$ VALUES
      ('en', 'English', 2)
      , ('de', 'Deutsch', 1)
    $$
    );

  SELECT finish();

ROLLBACK;

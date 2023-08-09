BEGIN;

  SELECT * FROM plan(1);

  SELECT languages_are(
    ARRAY[
      'plpgsql'
      ]);

  SELECT * FROM finish();

ROLLBACK;

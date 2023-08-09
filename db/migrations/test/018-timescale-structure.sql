BEGIN;

  SELECT * FROM plan(6);

  SELECT sequences_are('timescale'::NAME, '{}');

  SELECT functions_are('timescale'::NAME, '{}');

  SELECT types_are('timescale'::NAME, '{}');

  SELECT domains_are('timescale'::NAME, '{}');

  SELECT views_are('timescale'::NAME, '{}');

  SELECT tables_are('timescale'::NAME,
    ARRAY[
      'slot_booking'
    ]);

  SELECT finish();

ROLLBACK;

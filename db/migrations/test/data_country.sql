BEGIN;

  SELECT plan(1);

  SELECT cmp_ok(
    255
    , '='
    , (SELECT COUNT(*)::INTEGER FROM api.country)
  );

  SELECT finish();

ROLLBACK;

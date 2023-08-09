BEGIN;

  SELECT plan(1);

  SELECT cmp_ok(
    19
    , '>='
    , (SELECT COUNT(*)::INTEGER FROM api.amenity)
  );

  SELECT finish();

ROLLBACK;

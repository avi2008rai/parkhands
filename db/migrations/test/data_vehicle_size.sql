BEGIN;

  SELECT plan(1);

  SELECT cmp_ok(
    3
    , '>='
    , (SELECT COUNT(*)::INTEGER FROM api.vehicle_size)
  );

  SELECT finish();

ROLLBACK;

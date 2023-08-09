BEGIN;

  SELECT plan(1);

  SELECT cmp_ok(
    4
    , '='
    , (SELECT COUNT(*)::INTEGER FROM api.vehicle_type)
  );

  SELECT finish();

ROLLBACK;

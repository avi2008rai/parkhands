BEGIN;

  SELECT plan(1);

  SELECT cmp_ok(
    2
    , '<='
    , (SELECT COUNT(*)::INTEGER FROM api.user)
  );

  SELECT finish();

ROLLBACK;

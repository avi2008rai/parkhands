BEGIN;

  SELECT	  plan(1);

  SELECT results_eq(
  $$ SELECT COUNT(*)::INTEGER
  FROM settings.secrets
  WHERE
  KEY IN (
    'jwt_secret'
    , 'pg_hashids.salt'
    , 'jwt_longevity_login'
    , 'jwt_longevity_rememberme'
    , 'jwt_longevity_activation'
    , 'jwt_longevity_forgot_password'
    , 'auth.default-role'
    , 'auth.default-single-role'
    , 'auth.private-schema'
    , 'auth.api-schema'
    , 'db_env'
    , 'pg_event_send'
  )$$,
  $$ VALUES(12::INTEGER) $$
  );

  SELECT	  finish();

ROLLBACK;

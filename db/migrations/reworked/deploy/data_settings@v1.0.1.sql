-- Deploy PH:set_settings to pg
-- requires: fn_settings_set

BEGIN;

  \set QUIET on
  \o /dev/null

  \setenv base_dir :DIR
  \set base_dir `if [ $base_dir != ":"DIR ]; then echo $base_dir; else echo "/docker-entrypoint-initdb.d"; fi`
  \set anonymous `echo $DB_ANON_ROLE`
  \set authenticator `echo $DB_USER`
  \set authenticator_pass `echo $DB_PASS`
  \set jwt_secret `echo $JWT_SECRET`
  \set quoted_jwt_secret '\'' :jwt_secret '\''
  \set db_env '\''`echo $NODE_ENV`'\''

  SELECT settings.SET('jwt_secret', :quoted_jwt_secret);
  SELECT settings.SET('pg_hashids.salt', 'tGG3fApS4s4jorvTFNh28sQP9oRbJIzR');

  -- token expires in 24 hours
  SELECT settings.SET('jwt_longevity_login', '86400');

  -- token expires in 356 days / used in remember me
  select settings.SET('jwt_longevity_rememberme', '31536000');

  -- token expires in 7 days
  SELECT settings.SET('jwt_longevity_activation', '604800');

  -- token expires in 24 hours
  SELECT settings.SET('jwt_longevity_forgot_password', '86400');

  -- default role
  SELECT settings.SET('auth.default-role', :'anonymous');

  -- default authenticated roles
  SELECT settings.SET('auth.default-single-role', 'app_single_member');

  SELECT settings.SET('auth.private-schema', 'private');
  SELECT settings.SET('auth.api-schema', 'api');
  SELECT settings.SET('db_env', :'db_env');

COMMIT;

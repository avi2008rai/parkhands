-- Verify PH:set_settings on pg

BEGIN;

  SELECT 1/( 11 = COUNT(*) )::INTEGER
    FROM settings.secrets AS ss
   WHERE ss.VALUE IS NOT NULL
     AND KEY IN (
       'jwt_secret'
       , 'jwt_longevity_login'
       , 'jwt_longevity_rememberme'
       , 'jwt_longevity_activation'
       , 'jwt_longevity_forgot_password'
       , 'auth.default-role'
       , 'auth.default-single-role'
       , 'auth.private-schema'
       , 'auth.api-schema'
       , 'db_env'
       , 'pg_hashids.salt'
       );

ROLLBACK;

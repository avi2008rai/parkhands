-- Revert PH:set_settings to pg

BEGIN;

DELETE FROM settings.secrets
 WHERE KEY IN (
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

COMMIT;

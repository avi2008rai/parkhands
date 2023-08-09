BEGIN;

  -- Sanitize email and password fields
  -- into user-1@parkhands.de using pass '12345678
  UPDATE api.user u
     SET email = 'user-' || rn || '@parkhands.de',
         name  = 'user-' || rn
         FROM (SELECT
                id
                , ROW_NUMBER() OVER( ORDER BY created_at ) AS rn
                FROM api.user u2) u2
   WHERE u.id = u2.id
     AND NOT EXISTS (
       SELECT 1 FROM api.user WHERE email = 'user-' || rn || '@parkhands.de'
     );

  UPDATE private.user u
    SET password = '12345678';

   -- Set db_env variable to localhost
   SELECT settings.SET('db_env', E'\'localhost\'');

COMMIT;

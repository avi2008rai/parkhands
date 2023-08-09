-- used before restore db at the end of `npm run test-api`
BEGIN;

\set QUIET on
\set ON_ERROR_STOP on
set client_min_messages to warning;

TRUNCATE api.vehicle_type RESTART IDENTITY CASCADE;
TRUNCATE api.user RESTART IDENTITY CASCADE;
TRUNCATE settings.secrets RESTART IDENTITY CASCADE;

COMMIT;

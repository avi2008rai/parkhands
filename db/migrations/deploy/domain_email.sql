-- Deploy PH:domain_email to pg

BEGIN;

CREATE DOMAIN public.email AS citext
CHECK(
   VALUE ~* '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
);

COMMIT;

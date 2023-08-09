-- Deploy PH:table_parking_open_hours.sql to pg

BEGIN;

   ALTER TABLE api.parking_open_hours ALTER COLUMN currency DROP NOT NULL;
   ALTER TABLE api.parking_open_hours ALTER COLUMN currency TYPE TEXT;

COMMIT;



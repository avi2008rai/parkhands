-- used during tests to truncate
BEGIN;

  TRUNCATE api.user                   RESTART IDENTITY CASCADE;
  TRUNCATE api.vehicle                RESTART IDENTITY CASCADE;
  TRUNCATE api.translation            RESTART IDENTITY CASCADE;
  TRUNCATE api.slot                   RESTART IDENTITY CASCADE;
  TRUNCATE api.slot_amenity           RESTART IDENTITY CASCADE;
  TRUNCATE api.slot_availability      RESTART IDENTITY CASCADE;
  TRUNCATE timescale.slot_booking     RESTART IDENTITY CASCADE;
  TRUNCATE api.parking_space          RESTART IDENTITY CASCADE;
  TRUNCATE api.business               RESTART IDENTITY CASCADE;
  TRUNCATE api.payment_receipt        RESTART IDENTITY CASCADE;

  TRUNCATE private.pg_event           RESTART IDENTITY CASCADE;

COMMIT;

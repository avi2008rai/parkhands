-- Deploy PH:grants_slot_booking to pg
-- requires: table_slot_booking

BEGIN;

  GRANT SELECT ON timescale.slot_booking TO base_single;
  GRANT DELETE ON timescale.slot_booking TO base_single;

  GRANT INSERT (
    slot_id
    , user_id
    , status
    , license_plate
    , start_time
    , end_time
  ) ON timescale.slot_booking TO base_single;

  GRANT UPDATE (
    slot_id
    , user_id
    , status
    , license_plate
    , start_time
    , end_time
  ) ON timescale.slot_booking TO base_single;

  GRANT SELECT ON timescale.slot_booking TO base_super;
  GRANT INSERT ON timescale.slot_booking TO base_super;
  GRANT UPDATE ON timescale.slot_booking TO base_super;
  GRANT DELETE ON timescale.slot_booking TO base_super;

COMMIT;

-- Deploy PH:grants_slot_availability to pg
-- requires: table_slot_availability

BEGIN;

  GRANT SELECT ON api.slot_availability TO app_anonymous;
  
  GRANT SELECT ON api.slot_availability TO base_single;
  GRANT DELETE ON api.slot_availability TO base_single;

  GRANT INSERT (
    slot_id
    , day_of_week
    , start_hour
    , end_hour
  ) ON api.slot_availability TO base_single;

  GRANT UPDATE (
    slot_id
    , day_of_week
    , start_hour
    , end_hour
  ) ON api.slot_availability TO base_single;

  GRANT SELECT ON api.slot_availability TO base_super;
  GRANT INSERT ON api.slot_availability TO base_super;
  GRANT UPDATE ON api.slot_availability TO base_super;
  GRANT DELETE ON api.slot_availability TO base_super;

COMMIT;

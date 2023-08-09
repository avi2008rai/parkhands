-- Revert PH:data_vehicle_size from pg

BEGIN;

  DELETE FROM api.vehicle_size WHERE id IN (
    '59ae4bb4-2035-4eb2-9adf-abbc3f8aa50f'
    , '2949716b-fbb7-4fcf-b0eb-be21471c91f5'
    , '74fd2801-ede5-4ef6-856a-6db21836fe29'
  );

COMMIT;

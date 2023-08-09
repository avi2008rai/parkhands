-- Deploy PH:data_vehicle_size to pg
-- requires: table_vehicle_size

BEGIN;

  INSERT INTO api.vehicle_size
    (id, name, description, weight)
  VALUES
    ('59ae4bb4-2035-4eb2-9adf-abbc3f8aa50f', 'Small', 'Small Parking space', 1),
    ('2949716b-fbb7-4fcf-b0eb-be21471c91f5', 'Large', 'Large Parking space', 2),
    ('74fd2801-ede5-4ef6-856a-6db21836fe29', 'Extra Large', 'Extra Large Parking space', 3);

COMMIT;

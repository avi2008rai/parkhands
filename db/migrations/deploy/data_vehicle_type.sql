-- Deploy PH:data_vehicle_type to pg
-- requires: table_vehicle_type

BEGIN;

INSERT INTO api.vehicle_type (id, name, weight)
VALUES (
  'c2b47b1e-9412-4606-bb8d-49b3cc491a6d',
  'Petrol',
  '2'
), (
  '088fb065-32ff-4518-95b2-4bdd5b42353f',
  'Diesel',
  '3'
), (
  '3b6e5935-cb7d-41d7-b5a2-8bbb4e4b88dc',
  'Hybrid',
  '4'
), (
  '89c2be02-f369-4150-9f48-f5f949f7803d',
  'Electric',
  '1'
)
ON CONFLICT DO NOTHING;

COMMIT;

-- Deploy PH:data_amenity to pg
-- requires: table_amenity

BEGIN;

  INSERT INTO api.amenity
    (id, name, slug, description)
  VALUES
    ('b640b2c4-a380-46b5-9885-3fdbc520d7b1', 'Parking space reserved for women', 'womensparking', 'This slot is reserved for women drivers' ),
    ('da856315-20e4-47c5-9895-fd6865e06773', 'Mobility parking slot', 'carsharing', 'This slot is available for sharing cars'),
    ('fa477d1c-79df-4ddb-b254-a7411b78841b', 'Carpooling', 'carpooling', 'This slot is for carpooling'),
    ('51ce7285-5cf3-46f4-bc34-57fc9bf26743', 'Water supply for caravan', 'caravan-water', 'This slot has water supply for caravans'),
    ('4a57613a-8c25-4436-b6b6-779e69ea0ae9', 'Shower & washing rooms available for camping', 'camping-showers', 'This slot has shower/washing rooms in the proximity'),
    ('ea596194-6cca-4d3f-88bd-15caa10a3539', 'Power connector for caravan', 'caravan-power', 'The slot has a power connector suitable for caravans'),
    ('4263475f-1566-48af-b28c-ad34bc86469d', 'Automated valet parking', 'valet-parking', 'This slot is suited for automated valet parking'),
    ('8ae52b84-00ce-11ec-9aa4-00155deac78a', 'Sun protection', 'sun-protection', 'shaded parking slot');

COMMIT;

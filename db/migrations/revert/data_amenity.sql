-- Deploy PH:data_amenity to pg
-- requires: table_amenity

BEGIN;

    DELETE FROM api.amenity WHERE id IN (
    'b640b2c4-a380-46b5-9885-3fdbc520d7b1',
    'da856315-20e4-47c5-9895-fd6865e06773',
    'fa477d1c-79df-4ddb-b254-a7411b78841b',
    '51ce7285-5cf3-46f4-bc34-57fc9bf26743',
    '4a57613a-8c25-4436-b6b6-779e69ea0ae9',
    'ea596194-6cca-4d3f-88bd-15caa10a3539',
    '4263475f-1566-48af-b28c-ad34bc86469d',
    '8ae52b84-00ce-11ec-9aa4-00155deac78a'
    );

COMMIT;

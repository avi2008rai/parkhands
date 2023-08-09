-- Verify PH:data_amenity on pg

BEGIN;

  SELECT 1/( 19 = COUNT(*) )::INTEGER
  FROM api.amenity WHERE id IN (
    'bd97fd36-577d-4a57-a6eb-818dbdfbb96a',
    '9d652d12-ebf7-4c70-87cc-eef902783532',
    '51640187-5faa-435b-bb6c-c4a02b72a708',
    'fc18ac3a-0bed-4153-befb-b6ac05820623',
    'f5088d85-67d3-4ec6-a808-144a159dbb21',
    '82b92ad5-2e5a-4b06-92a8-b4de2d52cd80',
    'adeb48a9-5a59-40ab-9053-53ae32b1cb4a',
    '0d454ff6-1bf8-4208-8d82-c589d3af7a83',
    '436bb983-b1d1-42af-ba87-3e53cc22cbfe',
    '2ee3c759-a61e-46f0-ac96-175541fa79a9',
    'dc076883-6e7e-4927-895f-0f81578538fb',
    'b640b2c4-a380-46b5-9885-3fdbc520d7b1',
    'da856315-20e4-47c5-9895-fd6865e06773',
    'fa477d1c-79df-4ddb-b254-a7411b78841b',
    '51ce7285-5cf3-46f4-bc34-57fc9bf26743',
    '4a57613a-8c25-4436-b6b6-779e69ea0ae9',
    'ea596194-6cca-4d3f-88bd-15caa10a3539',
    '4263475f-1566-48af-b28c-ad34bc86469d',
    '8ae52b84-00ce-11ec-9aa4-00155deac78a'
  );

ROLLBACK;

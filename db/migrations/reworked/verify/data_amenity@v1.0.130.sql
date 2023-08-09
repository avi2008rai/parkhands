-- Verify PH:data_amenity on pg

BEGIN;

  SELECT 1/( 9 = COUNT(*) )::INTEGER
  FROM api.amenity WHERE id IN (
    'bd97fd36-577d-4a57-a6eb-818dbdfbb96a',
    '9d652d12-ebf7-4c70-87cc-eef902783532',
    '51640187-5faa-435b-bb6c-c4a02b72a708',
    'fc18ac3a-0bed-4153-befb-b6ac05820623',
    'f5088d85-67d3-4ec6-a808-144a159dbb21',
    '82b92ad5-2e5a-4b06-92a8-b4de2d52cd80',
    'adeb48a9-5a59-40ab-9053-53ae32b1cb4a',
    '0d454ff6-1bf8-4208-8d82-c589d3af7a83',
    '436bb983-b1d1-42af-ba87-3e53cc22cbfe'
  );

ROLLBACK;

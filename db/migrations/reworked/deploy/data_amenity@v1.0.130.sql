-- Deploy PH:data_amenity to pg
-- requires: table_amenity

BEGIN;

  INSERT INTO api.amenity
    (id, name, description)
  VALUES
    ('bd97fd36-577d-4a57-a6eb-818dbdfbb96a', 'Electric', 'Park and charge your electric vehicle'),
    ('9d652d12-ebf7-4c70-87cc-eef902783532', 'Handicapped', 'Reserved for people with disabilities'),
    ('51640187-5faa-435b-bb6c-c4a02b72a708', 'Mother + kid', 'Designated parking spots for mothers and children'),
    ('fc18ac3a-0bed-4153-befb-b6ac05820623', 'Illuminated', 'There is an overhead light on this slot'),
    ('f5088d85-67d3-4ec6-a808-144a159dbb21', 'Covered', 'This slot is covered'),
    ('82b92ad5-2e5a-4b06-92a8-b4de2d52cd80', 'Monitored', 'Video cameras cover the premises'),
    ('adeb48a9-5a59-40ab-9053-53ae32b1cb4a', 'Freestanding', 'Designated parking area'),
    ('0d454ff6-1bf8-4208-8d82-c589d3af7a83', 'Dirty free (no tree)', 'The slot is clear from tree debris'),
    ('436bb983-b1d1-42af-ba87-3e53cc22cbfe', 'Extra wide', 'Extra wide slot for larger vehicles');

COMMIT;

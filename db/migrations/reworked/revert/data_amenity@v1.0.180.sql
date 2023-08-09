-- Deploy PH:data_amenity to pg
-- requires: table_amenity

BEGIN;

  DELETE FROM api.amenity WHERE id IN (
    '2ee3c759-a61e-46f0-ac96-175541fa79a9',
    'dc076883-6e7e-4927-895f-0f81578538fb'
  );

COMMIT;

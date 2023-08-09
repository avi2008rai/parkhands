-- Revert PH:data_geodata_provider from pg

BEGIN;

  DELETE FROM api.geodata_provider WHERE id IN (
    '7d38d0b5-9453-4910-ab33-fa45974a09db'
    );

COMMIT;

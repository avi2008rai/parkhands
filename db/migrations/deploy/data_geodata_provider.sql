-- Deploy PH:data_geodata_provider to pg

BEGIN;

INSERT INTO api.geodata_provider (id, name, status) VALUES ('7d38d0b5-9453-4910-ab33-fa45974a09db', 'Google Maps', 'enabled');

COMMIT;

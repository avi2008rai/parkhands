-- Deploy PH:data_amenity to pg
-- requires: table_amenity

BEGIN;

  UPDATE api.amenity as a SET name = c.name_new
from (values
 ('Electric', 'electric'),
 ('Handicapped', 'handicapped'),
 ('Mother + kid', 'mother_child'),
 ('Illuminated', 'illuminated'),
 ('Covered', 'covered'),
 ('Monitored', 'monitored'),
 ('Freestanding', 'freestanding'),
 ('Dirty free (no tree)', 'dirt_free_no_tree'),
 ('Extra wide', 'extra_wide'),
 ('Parking space reserved for women', 'women_parking_space'),
 ('Mobility parking slot', 'mobility') ,
 ('Carpooling', 'carpooling'),
 ('Water supply for caravan', 'caravan_water_supply'),
 ('Shower & washing rooms available for camping', 'shower_washing_rooms'),
 ('Power connector for caravan', 'caravan_power_connecter'),
 ('Automated valet parking', 'avp'),
 ('Sun protection', 'sun_protection'),
 ('Business', 'business'),
 ('Private', 'private')
) as c(name_old, name_new) 
where c.name_old = a.name;

COMMIT;

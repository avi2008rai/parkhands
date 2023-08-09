-- POI: Beach - all days except tuesday when there is partial availability day_of_week = 2
INSERT INTO api.slot_availability (slot_id, day_of_week, start_hour, end_hour)
VALUES ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 0, '00:00',  '24:00'),
       ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 1, '00:00',  '24:00'),
       ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 2, '02:00',  '04:00'),
       ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 2, '06:00',  '24:00'),
       ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 3, '00:00',  '24:00'),
       ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 4, '00:00',  '24:00'),
       ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 5, '00:00',  '24:00'),
       ('8a45abd7-8c79-40f9-94b8-899cb3ff38fe', 6, '00:00',  '24:00');

-- POI: Park Street - all days
INSERT INTO api.slot_availability (slot_id, day_of_week, start_hour, end_hour)
VALUES ('7c209986-a9ae-4d33-b11d-fb72954ca00c', 0, '00:00',  '24:00'),
       ('7c209986-a9ae-4d33-b11d-fb72954ca00c', 1, '00:00',  '24:00'),
       ('7c209986-a9ae-4d33-b11d-fb72954ca00c', 2, '00:00',  '24:00'),
       ('7c209986-a9ae-4d33-b11d-fb72954ca00c', 3, '00:00',  '24:00'),
       ('7c209986-a9ae-4d33-b11d-fb72954ca00c', 4, '00:00',  '24:00'),
       ('7c209986-a9ae-4d33-b11d-fb72954ca00c', 5, '00:00',  '24:00'),
       ('7c209986-a9ae-4d33-b11d-fb72954ca00c', 6, '00:00',  '24:00');

-- POI: Stadium - all days
INSERT INTO api.slot_availability (slot_id, day_of_week, start_hour, end_hour)
VALUES ('108ffd4c-bc10-49cd-88ca-031df07dab40', 0, '00:00',  '24:00'),
       ('108ffd4c-bc10-49cd-88ca-031df07dab40', 1, '00:00',  '24:00'),
       ('108ffd4c-bc10-49cd-88ca-031df07dab40', 2, '00:00',  '24:00'),
       ('108ffd4c-bc10-49cd-88ca-031df07dab40', 3, '00:00',  '24:00'),
       ('108ffd4c-bc10-49cd-88ca-031df07dab40', 4, '00:00',  '24:00'),
       ('108ffd4c-bc10-49cd-88ca-031df07dab40', 5, '00:00',  '24:00'),
       ('108ffd4c-bc10-49cd-88ca-031df07dab40', 6, '00:00',  '24:00');

-- POI: University - all days except saturday where day_of_week = 6 and sunday where day_of_week = 0
INSERT INTO api.slot_availability (slot_id, day_of_week, start_hour, end_hour)
VALUES ('f4f8d2a6-276e-4881-875a-fc6bf4e77ea5', 1, '00:00',  '24:00'),
       ('f4f8d2a6-276e-4881-875a-fc6bf4e77ea5', 2, '00:00',  '24:00'),
       ('f4f8d2a6-276e-4881-875a-fc6bf4e77ea5', 3, '00:00',  '24:00'),
       ('f4f8d2a6-276e-4881-875a-fc6bf4e77ea5', 4, '00:00',  '24:00'),
       ('f4f8d2a6-276e-4881-875a-fc6bf4e77ea5', 5, '00:00',  '24:00');

-- POI: Stadium Bus Stop - all days
INSERT INTO api.slot_availability (slot_id, day_of_week, start_hour, end_hour)
VALUES ('5086e65c-d663-4684-8171-bf6e11bbbccb', 0, '00:00',  '24:00'),
       ('5086e65c-d663-4684-8171-bf6e11bbbccb', 1, '00:00',  '24:00'),
       ('5086e65c-d663-4684-8171-bf6e11bbbccb', 2, '00:00',  '24:00'),
       ('5086e65c-d663-4684-8171-bf6e11bbbccb', 3, '00:00',  '24:00'),
       ('5086e65c-d663-4684-8171-bf6e11bbbccb', 4, '00:00',  '24:00'),
       ('5086e65c-d663-4684-8171-bf6e11bbbccb', 5, '00:00',  '24:00'),
       ('5086e65c-d663-4684-8171-bf6e11bbbccb', 6, '00:00',  '24:00');

-- POI: Stadium Bus Stop
INSERT INTO timescale.slot_booking (slot_id, user_id, start_time, end_time)
VALUES
  ('5086e65c-d663-4684-8171-bf6e11bbbccb'
  , 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09'
  , '2020-05-29 09:00:00'
  , '2020-05-29 10:00:00'
  ),
  ('5086e65c-d663-4684-8171-bf6e11bbbccb'
  , 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09'
  , '2020-05-29 11:00:00'
  ,  '2020-05-29 12:00:00'
  ),
  ('5086e65c-d663-4684-8171-bf6e11bbbccb'
  , 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09'
  , '2020-05-29 15:00:00'
  ,  '2020-05-29 17:00:00');


-- POI: Stadium
INSERT INTO timescale.slot_booking (slot_id, user_id, start_time, end_time, phone, status)
VALUES
  ('108ffd4c-bc10-49cd-88ca-031df07dab40'
  , 'e4535745-ff95-4af4-bad1-9d649d506d2f'
  , '2020-05-29 09:00:00'
  , '2020-05-29 10:00:00'
  , '+35911111111'
  , 'pending'::booking_status_t
  ),
  ('108ffd4c-bc10-49cd-88ca-031df07dab40'
  , 'e4535745-ff95-4af4-bad1-9d649d506d2f'
  , '2020-05-29 13:00:00'
  ,  '2020-05-29 14:00:00'
  , '+49111111111'
  , 'pending'::booking_status_t
  ),
  ('108ffd4c-bc10-49cd-88ca-031df07dab40'
  , 'e4535745-ff95-4af4-bad1-9d649d506d2f'
  , '2020-05-30 13:00:00'
  , '2020-05-30 14:00:00'
  , '+49444444444'
  , 'canceled'::booking_status_t);

-- POI: Beach. Already started booking. Booking made by super_admin to a slot owned by single_member
INSERT INTO timescale.slot_booking (slot_id, user_id, start_time, end_time, phone)
VALUES
  ('ae922b27-5ae0-4335-baae-aa101a73d34c'
  , 'fbc0cc53-602b-4ab6-b65a-fe8e60c57a09'
  , (NOW() - interval '1 hours')::timestamp
  , (NOW() + interval '1 hours')::timestamp
  , '+35911111111');

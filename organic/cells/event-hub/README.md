# Backend of ph-event-hub

## Sample database events

```
SELECT util.pg_event_send(
    'user.forgot_password',
    '{ "me":
       { "id": "a390ff09-673d-4d12-8bed-5291dd182aa7",
         "name": "test_super_admin",
         "email": "test_super_admin@parkhands.de" }}'::json
  );
```

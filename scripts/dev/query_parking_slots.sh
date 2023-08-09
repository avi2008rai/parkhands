#!/bin/bash

bearer_token="$(set -a && . ./.env && ./scripts/dev/generate_jwt_token.sh)"

if [[ "${bearer_token}" == "" ]]; then
    echo "no bearer token provided - aborting"
    return 1
fi

curl 'http://localhost:5000/graphql' \
  -H 'accept: */*' \
  -H "Authorization: Bearer ${bearer_token}" \
  -H 'content-type: application/json' \
  -H 'Origin: http://localhost:3777' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: http://localhost:3777/' \
  --data-raw $'[{"operationName":"SlotsByOwner","variables":{"ownerId":"fbc0cc53-602b-4ab6-b65a-fe8e60c57a09","timeForBookingCheck":"2021-07-27T10:50:39.754Z","offset":0,"first":20},"query":"query SlotsByOwner($ownerId: UUID\u0021, $timeForBookingCheck: Datetime\u0021, $offset: Int, $first: Int) {\\n  slots(orderBy: CREATED_AT_DESC, offset: $offset, first: $first, condition: {ownerId: $ownerId}) {\\n    nodes {\\n      ...CommonSlotFields\\n      slotBookingsList(filter: {and: {startTime: {lessThan: $timeForBookingCheck}, endTime: {greaterThan: $timeForBookingCheck}, status: {notEqualTo: CANCELED}}}, first: 1) {\\n        id\\n        phone\\n        startTime\\n        endTime\\n        licensePlate\\n        status\\n        user {\\n          id\\n          name\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    totalCount\\n    __typename\\n  }\\n}\\n\\nfragment CommonSlotFields on Slot {\\n  id\\n  name\\n  notes\\n  photoUrl\\n  timezone\\n  description\\n  pricePerHour\\n  location {\\n    longitude: x\\n    latitude: y\\n    __typename\\n  }\\n  address\\n  status\\n  ownerId\\n  owner {\\n    id\\n    name\\n    __typename\\n  }\\n  __typename\\n}\\n"},{"operationName":"ActiveBooking","variables":{"payload":{"interval":{"hours":24}}},"query":"query ActiveBooking($payload: ActiveBookingInputRecordInput\u0021) {\\n  activeBooking(payload: $payload) {\\n    ...CommonBookingFields\\n    __typename\\n  }\\n}\\n\\nfragment CommonBookingFields on SlotBooking {\\n  id\\n  slotId\\n  slot {\\n    id\\n    name\\n    location {\\n      longitude: x\\n      latitude: y\\n      __typename\\n    }\\n    __typename\\n  }\\n  userId\\n  user {\\n    id\\n    name\\n    __typename\\n  }\\n  status\\n  phone\\n  licensePlate\\n  startTime\\n  endTime\\n  createdAt\\n  checkInAt\\n  checkOutAt\\n  __typename\\n}\\n"}]' \

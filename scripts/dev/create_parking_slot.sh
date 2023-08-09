#!/bin/bash

bearer_token="$(. scripts/dev/generate_jwt_token.sh)"
if [[ "${bearer_token}" == "" ]]; then
    echo "no bearer token provided - aborting"
    return 1
fi

payload='payload'

coordinates_x=10.527166496943182
coordinates_y=52.263557425965161
parkingslot_name=${1:-"parkingslot02"}
parkingslot_description=${2:-"some description"}

curl 'http://localhost:5000/graphql' \
  -H 'accept: */*' \
  -H "Authorization: Bearer ${bearer_token}" \
  -H 'content-type: application/json' \
  -H 'Origin: http://localhost:3777' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: http://localhost:3777/' \
 --data-raw $'[{"operationName":"CreateSlot","variables":{"payload":{"slot":{"location":{"type":"Point","coordinates":[\"${coordinates_x}\", \"${coordinates_y}\"],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}},"name":"\"${parkingslot_name\"","notes":"","status":"ENABLED","ownerId":"fbc0cc53-602b-4ab6-b65a-fe8e60c57a09","address":{"address_components":[{"long_name":"1","short_name":"1","types":["street_number"]},{"long_name":"Schloßplatz","short_name":"Schloßpl.","types":["route"]},{"long_name":"Innenstadt","short_name":"Innenstadt","types":["political","sublocality","sublocality_level_1"]},{"long_name":"Braunschweig","short_name":"BS","types":["locality","political"]},{"long_name":"Kreisfreie Stadt Braunschweig","short_name":"Kreisfreie Stadt Braunschweig","types":["administrative_area_level_3","political"]},{"long_name":"Niedersachsen","short_name":"NDS","types":["administrative_area_level_1","political"]},{"long_name":"Germany","short_name":"DE","types":["country","political"]},{"long_name":"38100","short_name":"38100","types":["postal_code"]}],"formatted_address":"Schloßpl. 1, 38100 Braunschweig, Germany","geometry":{"location":{"lat":52.2637587,"lng":10.5276645},"location_type":"ROOFTOP","viewport":{"south":52.2624097197085,"west":10.5263155197085,"north":52.26510768029149,"east":10.5290134802915}},"place_id":"ChIJVZfgQNj1r0cRt-U66ZbtScc","plus_code":{"compound_code":"7G7H+G3 Brunswick, Germany","global_code":"9F4G7G7H+G3"},"types":["street_address"]},"timezone":"Europe/Berlin","photoUrl":"","description":"\"${parkingslot_descrition}\","pricePerHour":4.2,"vehicleSizeId":"59ae4bb4-2035-4eb2-9adf-abbc3f8aa50f","parkingSpaceId":null,"slotAmenitiesUsingId":{"deleteOthers":true,"create":[{"amenityId":"2ee3c759-a61e-46f0-ac96-175541fa79a9"}]},"slotAvailabilitiesUsingId":{"deleteOthers":true,"create":[{"dayOfWeek":0,"startHour":"09:00:00","endHour":"18:00:00"},{"dayOfWeek":1,"startHour":"09:00:00","endHour":"18:00:00"},{"dayOfWeek":2,"startHour":"09:00:00","endHour":"18:00:00"},{"dayOfWeek":3,"startHour":"09:00:00","endHour":"18:00:00"},{"dayOfWeek":4,"startHour":"09:00:00","endHour":"18:00:00"},{"dayOfWeek":5,"startHour":"09:00:00","endHour":"18:00:00"},{"dayOfWeek":6,"startHour":"09:00:00","endHour":"18:00:00"}]}}}},"query":"mutation CreateSlot($payload: CreateSlotInput\u0021) {\\n  createSlot(input: $payload) {\\n    slot {\\n      id\\n      name\\n      timezone\\n      slug\\n      location {\\n        longitude: x\\n        latitude: y\\n        __typename\\n      }\\n      notes\\n      address\\n      slotAmenitiesList {\\n        amenity {\\n          id\\n          name\\n          __typename\\n        }\\n        __typename\\n      }\\n      slotAvailabilitiesList {\\n        id\\n        dayOfWeek\\n        startHour\\n        endHour\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}]' \

#!/bin/bash

docker exec -ti ph_organic npm run dev-stop

# event-hub
docker exec -ti ph_organic npm run test --prefix cells/event-hub

# file-api
docker exec -ti ph_organic npm run test --prefix cells/file-api

# rest-api
docker exec -ti ph_organic npm run test --prefix cells/rest-api

docker exec -ti ph_organic npm run dev-start

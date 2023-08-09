#!/bin/bash

docker exec -ti ph_organic npm run dev-stop

docker exec -ti ph_graphql mocha ./test/api/ --config ./test/.mocharc.json

# docker exec -ti ph_organic npm run dev-start

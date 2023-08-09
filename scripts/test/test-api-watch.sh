#!/bin/bash

set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_graphql mocha --watch ./test/api/

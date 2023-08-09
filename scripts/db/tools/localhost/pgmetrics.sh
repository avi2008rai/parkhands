#!/bin/bash

# usage `./scripts/db/tools/localhost/pgmetrics.sh`

source .env

docker run -it --rm --name pgmetrics \
  --network ${COMPOSE_PROJECT_NAME//-/}_ph-net \
  -e PGPASSWORD="${PGPASSWORD}" \
  rapidloop/pgmetrics \
  -h db-0 -p 5432 -U postgres --no-password

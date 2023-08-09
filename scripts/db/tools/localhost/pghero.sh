#!/bin/bash

# usage `./scripts/db/tools/localhost/pghero.sh`

source .env

docker run -it --rm --name pghero \
  --network ${COMPOSE_PROJECT_NAME//-/}_ph-net \
  -e DATABASE_URL=postgres://${POSTGRESQL_USERNAME}:${PGPASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME} \
  -p 8080:8080 \
  ankane/pghero

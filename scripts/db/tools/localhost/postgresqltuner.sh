#!/bin/bash

# usage `./scripts/db/tools/localhost/postgresqltuner.sh`

source .env

docker run -it --rm --name postgresqltuner \
  --network ${COMPOSE_PROJECT_NAME//-/}_ph-net \
  jfcoz/postgresqltuner \
  --host=${DB_HOST} --user=${POSTGRESQL_USERNAME} --password=${PGPASSWORD} --database=${DB_NAME}

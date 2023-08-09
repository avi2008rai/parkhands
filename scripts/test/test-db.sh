#!/bin/bash

PROJECT_ROOT=`git rev-parse --show-toplevel`

# Determine which Docker image to run.
PG_PROVE_IMAGE=${PG_PROVE_IMAGE:=horrendo/pg_prove:latest}

# Set up required pass-through variables.
passenv=(
    -e "PGHOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${COMPOSE_PROJECT_NAME}_db)" \
    -e "PGDATABASE=${DB_NAME}" \
    -e "PGUSER=${POSTGRESQL_USERNAME}" \
    -e "PGPASSWORD=${POSTGRESQL_PASSWORD}" \
    -e "DEVELOPMENT=${DEVELOPMENT}" \
    -e "NODE_ENV=${NODE_ENV}" \
)

# Run the container with the current and home directories mounted.
docker run --rm --name pg_prove --network ${COMPOSE_PROJECT_NAME}_ph-net \
    --mount "type=bind,src=${PROJECT_ROOT:?}/db/migrations/test/,dst=/tmp" \
    "${passenv[@]}" "$PG_PROVE_IMAGE" "$@"

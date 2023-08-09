#!/bin/bash

# kubectl port-forward svc/postgresql-ha-pgpool --namespace=staging 5432:5432 --kubeconfig=./scripts/provisioning/cluster/credentials/.kubeconfig
# usage `./scripts/db/tools/staging/pghero.sh`

source .env

docker run -it --rm --name pghero \
  --network=host \
  -e DATABASE_URL=postgres://${POSTGRESQL_USERNAME}:${PGPASSWORD}@localhost:${DB_PORT}/${DB_NAME} \
  -p 8080:8080 \
  ankane/pghero

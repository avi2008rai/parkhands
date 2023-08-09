#!/bin/bash

# kubectl port-forward svc/postgresql-ha-pgpool --namespace=staging 5432:5432 --kubeconfig=./scripts/provisioning/cluster/credentials/.kubeconfig
# usage `./scripts/db/tools/staging/pgmetrics.sh`

source .env

docker run -it --rm --name pgmetrics \
  --network=host \
  -e PGPASSWORD="${PGPASSWORD}" \
  rapidloop/pgmetrics \
  -h localhost -p ${DB_PORT} -U ${POSTGRESQL_USERNAME}

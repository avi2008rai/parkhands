#!/bin/bash

# kubectl port-forward svc/postgresql-ha-pgpool --namespace=staging 5432:5432 --kubeconfig=./scripts/provisioning/cluster/credentials/.kubeconfig
# usage `./scripts/db/tools/staging/postgresqltuner.sh`

source .env

docker run -it --rm --name postgresqltuner \
  --network=host \
  jfcoz/postgresqltuner \
  --host=localhost --user=${POSTGRESQL_USERNAME} --password=${PGPASSWORD} --database=${DB_NAME}

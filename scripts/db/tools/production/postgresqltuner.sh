#!/bin/bash

# kubectl port-forward svc/postgresql-ha-pgpool --namespace=production 5432:5432 --kubeconfig=./scripts/provisioning/cluster/credentials/.kubeconfig
# usage `./scripts/db/tools/production/postgresqltuner.sh`

source .env

docker run -it --rm --name postgresqltuner \
  --network=host \
  jfcoz/postgresqltuner \
  --host=localhost --user=${POSTGRESQL_USERNAME} --password=${PRODUCTION_PGPASSWORD} --database=${DB_NAME}

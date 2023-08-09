
## Database persistence

Database in use is dockerized PostgreSQL 11.7. In order to have persistent database with docker, the data directory is stored in named docker volume per environment cluster.

You can list and inspect all named volumes with `docker volume` command

```bash
docker volume ls
DRIVER              VOLUME NAME
local               ph_postgres-data

docker volume inspect ph_postgres-data
```

If you need to start over with fresh database just remove this volume when your local cluster is down.

```bash
docker volume rm ph_postgres-data
```

You can login directly to psql using following command

```bash
npm run psql
```

## Database migrations



Database migrations are managed with [Sqitch](https://sqitch.org/)

It has a configuration plan for all local targets in `db/migrations/sqitch.conf`. You may need to adapt `DB_NAME` inside your `.env` files to match targets in `sqitch.conf`.

Sqitch is wrapped as docker container and can be used the following way

```bash
npm run sqitch status
npm run sqitch deploy
npm run sqitch revert
npm run sqitch rebase
```

See detailed [databse migration guide](https://github.com/camplight/parkhands/blob/master/db/migrations/README.md)


## Connection

Download `.kubeconfig` from Rancher into `<project-root>/scripts/provisioning/cluster/credentials/`

#### Staging

```
kubectl port-forward svc/postgresql-ha-pgpool \
  --namespace=staging 5432:5432 \
  --kubeconfig=./scripts/provisioning/cluster/credentials/.kubeconfig
```

#### Production

```
kubectl port-forward svc/postgresql-ha-pgpool \
  --namespace=production 5432:5432 \
  --kubeconfig=./scripts/provisioning/cluster/credentials/.kubeconfig
```

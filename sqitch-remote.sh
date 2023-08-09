#!/bin/bash
#call like this:
#REMOTE_DB_HOST=127.0.0.1 REMOTE_DB_PORT=5432 ./sqitch-remote.sh to deploy to a host at 127.0.0.1 on port 5432
npm run sqitch deploy --target "db:pg://${POSTGRESQL_USERNAME:-postgres}:${POSTGRESQL_PASSWORD:-postgrespass}@${REMOTE_DB_HOST:-localhost}:${REMOTE_DB_PORT:-5432}/app"

#!/bin/bash

PROJECT_ROOT=`git rev-parse --show-toplevel`

echo ===========================================================================
echo " Dump current database before API tests."

#set -a && source ./.env && \
#  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db /scripts/db/insider.sh dump > /dev/null
scripts/db/local_db_backup.sh backup

echo ===========================================================================
echo " Run API tests."
npm run test-api-debug

echo ===========================================================================
echo " Restore database after API tests."
#set -a && source ./.env && \
#  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db /scripts/db/insider.sh restore > /dev/null
scripts/db/local_db_backup.sh restore
docker-compose --compatibility restart graphql organic
echo ===========================================================================

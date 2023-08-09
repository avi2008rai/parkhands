#!/bin/bash

PROJECT_ROOT=`git rev-parse --show-toplevel`

# Determine which Docker image to run.
SQITCH_IMAGE=${SQITCH_IMAGE:=sqitch/sqitch:latest}

# Figure out who I am.
user=${USER-$(whoami)}
if [ "Darwin" = $(uname) ]; then
    fullname=$(id -P $user | awk -F '[:]' '{print $8}')
else
    fullname=$(getent passwd $user | cut -d: -f5 | cut -d, -f1)
fi

# Set up required pass-through variables.
passenv=(
    -e "SQITCH_ORIG_SYSUSER=$user"
    -e "SQITCH_ORIG_FULLNAME=\"$fullname\""
    -e "SQITCH_ORIG_EMAIL=$user@$(hostname)" #FIXME
    -e "TZ=$(date +%Z)" \
    -e "LESS=${LESS:--R}" \
    -e "POSTGRES_USER=${POSTGRESQL_USERNAME}" \
    -e "POSTGRES_PASSWORD=${POSTGRESQL_PASSWORD}" \
    -e "POSTGRES_DB=${DB_NAME}" \
    -e "PGHOSTADDR=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${COMPOSE_PROJECT_NAME}_db)" \
    -e "DB_NAME=${DB_NAME}" \
    -e "DB_USER=${DB_USER}" \
    -e "DB_PASS=${DB_PASS}" \
    -e "DB_ANON_ROLE=${DB_ANON_ROLE}" \
    -e "DB_SCHEMA=${DB_SCHEMA}" \
    -e "JWT_SECRET=${JWT_SECRET}" \
    -e "DEVELOPMENT=${DEVELOPMENT}" \
    -e "NODE_ENV=${NODE_ENV}" \
    -e "PGPASSWORD=${POSTGRESQL_PASSWORD}" \
)

# Iterate over optional Sqitch and engine variables.
for var in \
    SQITCH_CONFIG SQITCH_USERNAME SQITCH_PASSWORD SQITCH_FULLNAME SQITCH_EMAIL \
    DBI_TRACE \
    PGUSER PGPASSWORD PGHOST PGHOSTADDR PGPORT PGDATABASE PGPASSFILE PGSERVICE PGSERVICEFILE PGOPTIONS PGSSLMODE PGREQUIRESSL PGSSLCOMPRESSION PGSSLCERT PGSSLKEY PGSSLROOTCERT PGSSLCRL PGREQUIREPEER PGKRBSRVNAME PGKRBSRVNAME PGGSSLIB PGCONNECT_TIMEOUT PGCLIENTENCODING  PGTARGETSESSIONATTRS \
    MYSQL_PWD MYSQL_HOST MYSQL_TCP_PORT MYSQL_HOME \
    TNS_ADMIN TWO_TASK ORACLE_SID \
    ISC_USER ISC_PASSWORD \
    VSQL_HOME VSQL_HOST VSQL_PORT VSQL_USER VSQL_PASSWORD VSQL_SSLMODE \
    SNOWSQL_ACCOUNT SNOWSQL_USER SNOWSQL_PWD SNOWSQL_HOST SNOWSQL_PORT SNOWSQL_DATABASE SNOWSQL_REGION NOWSQL_WAREHOUSE
do
    if [ ! -z "${!var}" ]; then
       passenv+=("-e" "$var=${!var}")
    fi
done

# Run the container with the current and home directories mounted.
#docker run --rm --name sqitch --network ${COMPOSE_PROJECT_NAME}_ph-net \
#    --mount "type=bind,src=${PROJECT_ROOT:?}/db/migrations,dst=/repo" \
#    --mount "type=bind,src=$HOME,dst=/home" \
#    "${passenv[@]}" "$SQITCH_IMAGE" "$@"

docker volume rm db-migrations-volume 2> /dev/null
docker rm sqitch 2> /dev/null
docker rm alpine 2> /dev/null

docker volume create db-migrations-volume

docker create --name alpine --mount "source=db-migrations-volume,target=/repo" alpine:latest
docker cp db/migrations/. alpine:/repo

#FIXME debug output
echo "###############################################################"
echo "docker run \
  --rm \
  --name sqitch \
  --network \"${COMPOSE_PROJECT_NAME}_ph-net\" \
  --mount \"source=db-migrations-volume,target=/repo\" \
  \"${passenv[@]}\" \"$SQITCH_IMAGE\" \"$@\""
echo "###############################################################"

docker run \
  --rm \
  --name sqitch \
  --network "${COMPOSE_PROJECT_NAME}_ph-net" \
  --mount "source=db-migrations-volume,target=/repo" \
  "${passenv[@]}" "$SQITCH_IMAGE" "$@"

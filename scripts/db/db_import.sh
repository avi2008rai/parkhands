#!/bin/bash

# usage `npm run db-import-local`

PROJECT_ROOT=`git rev-parse --show-toplevel`

tar -xjf ${PROJECT_ROOT:?}/sql-dumps/latest.sql.tar.bz2 -C ${PROJECT_ROOT:?}/sql-dumps

for x in ${PROJECT_ROOT:?}/sql-dumps/app_*.sql;do mv $x ${PROJECT_ROOT:?}/sql-dumps/latest.sql;done

echo ===========================================================================
echo " Terminate all current connections."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db psql \
          --username=${POSTGRESQL_USERNAME:?} \
          --dbname=postgres \
          -c "SELECT pg_terminate_backend(pg_stat_activity.pid)
              FROM pg_stat_activity
              WHERE pg_stat_activity.datname = '${DB_NAME:?}';" > /dev/null

echo ===========================================================================
echo " Drop local database."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db psql \
          --username=${POSTGRESQL_USERNAME:?} \
          --dbname=postgres \
          -c "DROP DATABASE IF EXISTS ${DB_NAME:?};" > /dev/null

echo ===========================================================================
echo " Recreate local database."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db psql \
          --username=${POSTGRESQL_USERNAME:?} \
          --dbname=postgres \
          -c "CREATE DATABASE ${DB_NAME:?};" > /dev/null

echo ===========================================================================
echo " Create database roles."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db psql \
          --username=${POSTGRESQL_USERNAME:?} \
          --dbname=${DB_NAME:?} \
          --file=/sql-dumps/roles.sql > /dev/null

echo ===========================================================================
echo " Create timescaledb extension and execute timescaledb_pre_restore()."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db psql \
          -U ${POSTGRESQL_USERNAME:?} \
          -d ${DB_NAME:?} \
          -c 'CREATE EXTENSION timescaledb; SELECT timescaledb_pre_restore();' > /dev/null

echo ===========================================================================
echo " Import latest.dump into local database."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db pg_restore \
          --username=${POSTGRESQL_USERNAME:?} \
          --dbname=${DB_NAME:?} \
          --format=custom \
          --disable-triggers \
          /sql-dumps/latest.sql > /dev/null

echo ===========================================================================
echo " Execute timescaledb_post_restore()."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db psql \
          -U ${POSTGRESQL_USERNAME:?} \
          -d ${DB_NAME:?} \
          -c 'SELECT timescaledb_post_restore();' > /dev/null

echo ===========================================================================
echo " Sanitize sensitive information."
set -a && source ./.env && \
  docker exec -ti ${COMPOSE_PROJECT_NAME//-/}_db psql \
          --username=${POSTGRESQL_USERNAME:?} \
          --dbname=${DB_NAME:?} \
          --file=/shared/db/sanitize_db.sql > /dev/null
echo ===========================================================================
echo " Restart stack..."

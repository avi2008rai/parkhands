#!/bin/bash
# this script will run inside docker database container

case $1 in
  dump)
    rm /sql-dumps/test-api.dump

    PGPASSWORD=${POSTGRESQL_PASSWORD:?} pg_dump \
              --data-only \
              --format=custom \
              -U ${POSTGRESQL_USERNAME:?} \
              -d ${DB_NAME:?} \
              > /sql-dumps/test-api.dump
    ;;
  restore)
    PGPASSWORD=${POSTGRESQL_PASSWORD:?} psql \
              -U ${POSTGRESQL_USERNAME:?} \
              -d ${DB_NAME:?} \
              -f /shared/db/truncate_all.sql

    PGPASSWORD=${POSTGRESQL_PASSWORD:?} psql \
              -U ${POSTGRESQL_USERNAME:?} \
              -d ${DB_NAME:?} \
              -c 'SELECT timescaledb_pre_restore();'

    PGPASSWORD=${POSTGRESQL_PASSWORD:?} pg_restore \
              --data-only \
              --format=custom \
              --disable-triggers \
              -U ${POSTGRESQL_USERNAME:?} \
              -d ${DB_NAME:?} \
              /sql-dumps/test-api.dump

    PGPASSWORD=${POSTGRESQL_PASSWORD:?} psql \
              -U ${POSTGRESQL_USERNAME:?} \
              -d ${DB_NAME:?} \
              -c 'SELECT timescaledb_post_restore();'

    exit 0
    ;;
  *)
    echo -e "$0 invalid command parameter: '$1'"
    exit 1
    ;;
esac

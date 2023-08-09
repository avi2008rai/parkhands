#!/bin/bash

# usage `npm run db-export-staging` or `npm run db-export-production`

NAMESPACE=$1

PROJECT_ROOT=`git rev-parse --show-toplevel`
LOCAL_DUMP_PATH=$PROJECT_ROOT/sql-dumps

echo ===========================================================================
echo " Download database dump from ${1} storage."
echo
# remove old dumps
rm -rf ${LOCAL_DUMP_PATH}/*

source ${PROJECT_ROOT}/.env && \
docker run -it \
  -v ${LOCAL_DUMP_PATH}:/sql-dumps \
  -v ${PROJECT_ROOT}/scripts/db:/script \
  -e MINIO_ACCESS_KEY="${BACKUP_MINIO_ACCESS_KEY}" \
  -e MINIO_SECRET_KEY="${BACKUP_MINIO_SECRET_KEY}" \
  -e MINIO_PORT="${BACKUP_MINIO_PORT}" \
  -e MINIO_ENDPOINT="${BACKUP_MINIO_ENDPOINT}" \
  -e NAMESPACE="${NAMESPACE}" \
  --entrypoint=/bin/sh minio/mc \
  -c "/script/minio-client-cp.sh"

echo
echo ===========================================================================

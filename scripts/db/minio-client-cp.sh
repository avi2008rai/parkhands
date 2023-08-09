#!/bin/sh

# configure minio host
mc config host add backup https://${MINIO_ENDPOINT}:${MINIO_PORT} ${MINIO_ACCESS_KEY} ${MINIO_SECRET_KEY} --api S3v4 --insecure
# get filename of latest sql dump
BACKUP_PATH=postgresql/postgresql-backups/${NAMESPACE}/daily/app/
LATEST_DUMP=$(mc ls --insecure backup/${BACKUP_PATH} | sort -rk1 | head -1 | awk '{print $5}')
# copy from remote into local (where local dir is inside minio-client container but mounted from host machine as /sql-dumps)
mc cp backup/${BACKUP_PATH}${LATEST_DUMP} /sql-dumps/latest.sql.tar.bz2 --insecure

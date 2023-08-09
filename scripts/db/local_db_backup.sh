#!/bin/bash

#FIXME fail by default
DB_HOST=localhost
DB_NAME="${DB_NAME:-app}"
DB_PORT="${DB_PORT:-5432}"
POSTGRESQL_USERNAME="${POSTGRESQL_USERNAME:-postgres}"
POSTGRESQL_PASSWORD="${POSTGRESQL_PASSWORD:-postgrespass}"

DB_DUMP_TARGET=sql-dumps #FIXME
DB_DUMP_NAME=database_dump.sql #FIXME

if [[ ! $(pg_dump --version 2> /dev/null)  =~ "PostgreSQL" ]]; then
    echo "You need to have pg_dump installed in order to use this script"
    exit 1
fi

case $1 in
    backup)
        echo "Dumping database ${DB_NAME} from ${DB_HOST}:${DB_PORT} to ${DB_DUMP_TARGET}/${DB_DUMP_NAME}"
        [ -f "${DB_DUMP_TARGET}/${DB_DUMP_NAME}" ] && rm "${DB_DUMP_TARGET}/${DB_DUMP_NAME}"
        PGPASSWORD="${POSTGRESQL_PASSWORD}" pg_dump \
            --host "${DB_HOST}" \
            --port "${DB_PORT}" \
            --format=custom \
            --user "${POSTGRESQL_USERNAME}" \
            "${DB_NAME}" > "${DB_DUMP_TARGET}/${DB_DUMP_NAME}" 2> /dev/null
            #"${DB_NAME}" > "${DB_DUMP_TARGET}/${DB_DUMP_NAME}" 2> /dev/null #see below why we pipe errors to /dev/null
        echo "Done! Backup available at ${DB_DUMP_TARGET}/${DB_DUMP_NAME}"
        exit 0
        ;;
    restore)
        echo "Restoring ${DB_DUMP_TARGET}/${DB_DUMP_NAME} to ${DB_HOST}:${DB_PORT} ${DB_NAME}"
        if [[ ! -f "${DB_DUMP_TARGET}/${DB_DUMP_NAME}" ]]; then
            echo "File ${DB_DUMP_TARGET}/${DB_DUMP_NAME} does not exist - no dump available to restore from"
            exit 1
        fi
        #first close all sessions on the database so that we can drop it
        PGPASSWORD="${POSTGRESQL_PASSWORD}" psql \
            --host "${DB_HOST}" \
            --port "${DB_PORT}" \
            --user "${POSTGRESQL_USERNAME}" \
            -c "select pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname= '${DB_NAME}' AND pid <> pg_backend_pid();" > /dev/null

        #drop the database
        PGPASSWORD="${POSTGRESQL_PASSWORD}" psql \
            --host "${DB_HOST}" \
            --port "${DB_PORT}" \
            --user "${POSTGRESQL_USERNAME}" \
            -c "DROP database ${DB_NAME};" 2> /dev/null 1> /dev/null

        #recreate the database
        PGPASSWORD="${POSTGRESQL_PASSWORD}" psql \
            --host "${DB_HOST}" \
            --port "${DB_PORT}" \
            --user "${POSTGRESQL_USERNAME}" \
            -c "CREATE database ${DB_NAME};" 2> /dev/null 1> /dev/null

        PGPASSWORD="${POSTGRESQL_PASSWORD}" pg_restore \
            --host "${DB_HOST}" \
            --port "${DB_PORT}" \
            --user "${POSTGRESQL_USERNAME}" \
            --clean \
            --create \
            -d "${DB_NAME}" "${DB_DUMP_TARGET}/${DB_DUMP_NAME}" 2> /dev/null
        exit 0
        ;;
    *)
        echo "Perform either a database dump via 'backup_local_db.sh backup' or a restore via 'backup_local_db.sh restore'"
        exit 1
        ;;
esac



#echo "PGPASSWORD=\"${POSTGRESQL_PASSWORD}\" pg_dump --host \"${DB_HOST}\" --port \"${DB_PORT}\" -U \"${POSTGRESQL_USERNAME}\" app > app_backup.sql"
# pipe error message to /dev/null because it will "always" return the error messages listed below
# seems to come from timescaledb - see: https://github.com/timescale/timescaledb/issues/1581
#   pg_dump: warning: there are circular foreign-key constraints on this table:
#   pg_dump:   hypertable
#   pg_dump: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
#   pg_dump: Consider using a full dump instead of a --data-only dump to avoid this problem.
#   pg_dump: warning: there are circular foreign-key constraints on this table:
#   pg_dump:   chunk
#   pg_dump: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
#   pg_dump: Consider using a full dump instead of a --data-only dump to avoid this problem.

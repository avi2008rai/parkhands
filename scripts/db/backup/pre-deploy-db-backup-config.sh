USERNAME=postgres
PEER_AUTH=yes
DBHOST=postgresql-ha-pgpool
DBNAMES=app
BACKUPDIR=/storage/postgresql/pre-deployment-backups
MAILCONTENT=stdout
MAXATTSIZE="4000"
MAILADDR="timon.schroeder@diconium.com"

# ADVANCED OPTIONS

MDBNAMES="$DBNAMES"

DBEXCLUDE=""

CREATE_DATABASE=no

SEPDIR=yes

COMP=bzip2

FILTER_ROLES="/usr/local/bin/filter_roles.py"

#
DATE=$(date +%Y-%m-%d-%H_%M_%S-%Z)
DOW=${GIT_COMMIT_HASH:-default}

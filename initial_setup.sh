#!/bin/bash

#create local copy of .env file to bundle environment variables
echo -e "\033[1;33mCreate local copy from ./.env"
cp ./.env.example ./.env #TODO make some adjustements

#verify that ./.env file has the correct formatting
if [[ $(file ./.env) =~ "CRL" ]]; then
    echo -e "\033[0;41mPROBLEM! File \033[1;33m./.env \033[0;41mmust be in unix file format!\033[0;m\n"
    echo "$(file ./.env)"
    exit 1
fi

#Verify ssl connectivity to npmjs.com
VERIFY_HOST="npmjs.com"
SSL_CERTIFICATE_CHAIN=$(echo -e "Q\n" | openssl s_client -crlf -showcerts -verify_hostname "${VERIFY_HOST}" -connect "${VERIFY_HOST}":443 2>&1 1>/dev/null)

echo -e "\033[1;33mVerify SSL connectivity to ${VERIFY_HOST}"
if [[ "${SSL_CERTIFICATE_CHAIN}X" == "X" || "${SSL_CERTIFICATE_CHAIN}X" =~ "error" ]];
then
    echo -e "\033[0;41mPROBLEM! SSL connection to \033[1;33m$VERIFY_HOST\033[0;41m was not successfull - please debug:\033[0;m\n"
    echo -e "\033[1;33m----------------------------START DEBUG OUTPUT-------------------"
    echo -e "$: openssl s_client -crlf -showcerts -verify_hostname $VERIFY_HOST -connect $VERIFY_HOST:443\n(partial output only)"
    echo -e "\033[1;31m${SSL_CERTIFICATE_CHAIN}"
    echo -e "\033[1;33m----------------------------END DEBUG OUTPUT-------------------"
    exit 1
fi
echo -e "\033[0;32mdone.\n"

echo -e "\033[1;33mInstall dependencies"
npm run init-cells
echo -e "\033[0;32mdone.\n"

echo -e "\033[1;33mEnsure that all necessary scripts are executable"

[ -f ./scripts/db/sqitch.sh ]   &&  chmod +x ./scripts/db/sqitch.sh
[ -f ./scripts/db/insider.sh ]  &&   chmod +x ./scripts/db/insider.sh
[ -f ./scripts/db/db_export.sh ] && chmod +x ./scripts/db/db_export.sh
[ -f ./scripts/db/db_import.sh ]    &&  chmod +x ./scripts/db/db_import.sh
[ -f ./scripts/db/minio-client-cp.sh ]  &&  chmod +x ./scripts/db/minio-client-cp.sh
[ -f ./scripts/dev/stripe-listen.sh ]   &&  chmod +x ./scripts/dev/stripe-listen.sh
[ -f ./scripts/init.sh ]    &&  chmod +x ./scripts/init.sh
[ -f ./scripts/deploy.sh ]  &&   chmod +x ./scripts/deploy.sh
[ -f ./scripts/test/test-db.sh ]    && chmod +x ./scripts/test/test-db.sh
[ -f ./scripts/test/test-api.sh ]   &&    chmod +x ./scripts/test/test-api.sh
[ -f ./scripts/test/test-api-debug.sh ] &&  chmod +x ./scripts/test/test-api-debug.sh
[ -f ./scripts/test/test-api-watch.sh ] &&  chmod +x ./scripts/test/test-api-watch.sh
[ -f ./scripts/test/test-organic.sh ]   &&    chmod +x ./scripts/test/test-organic.sh
[ -f ./scripts/tools/graphql-playground/run.sh ] && chmod +x ./scripts/tools/graphql-playground/run.sh
[ -f ./scripts/tools/graphql-voyager/run.sh ]   &&  chmod +x ./scripts/tools/graphql-voyager/run.sh
echo -e "\033[1;33mdone.\n"

echo -e "\033[1;33mLaunch backend (without rolling out migrations onto the database)"
npm run stack-up-vanilla-db
echo -e "\033[0;32mdone.\n"

echo -e "\n\n\033[1;33mNext step is either runnin migrations on a local db via:\nnpm run sqitch deploy dev\nOR, in case of a remote database, run the migrations remotely via:\nREMOTE_DB_HOST=<remote host> REMOTE_DB_PORT=<remote port> ./sqitch-remote.sh\n"

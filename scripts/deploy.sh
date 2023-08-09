#!/bin/bash

# helper function to comment/uncomment build step in .rancher-pipeline.yml
toogle_build_step() {
  IMAGE_NAME=$1
  DEPLOY_VERSION=$2
  IMAGE_PATH=$3
  # replace deploy var in pipeline
  sed -i "s/DEPLOY_${IMAGE_NAME}_IMAGE_TAG.*/DEPLOY_${IMAGE_NAME}_IMAGE_TAG: ${DEPLOY_VERSION}/" .rancher-pipeline.yml

  if [ ${DEPLOY_VERSION} = "LATEST" ]; then
    BUILD_ID=$(git describe --tags --abbrev=0)
    if [ ${IMAGE_NAME} != "DB" ]; then
      # add build version from package.json in root directory into package.json in container directory
      npm version --prefix ./${IMAGE_PATH} ${BUILD_ID}
      git add ${PROJECT_DIR}/${IMAGE_PATH}
    else
      # change db image tag for helm chart in respective values.yaml file
      sed -i "s/tag.*/tag: ${BUILD_ID:1}/" ${PROJECT_DIR}/deploy/staging/db/values.yaml
      git add ${PROJECT_DIR}/deploy/staging/db/values.yaml
      sed -i "s/tag.*/tag: ${BUILD_ID:1}/" ${PROJECT_DIR}/deploy/production/db/values.yaml
      git add ${PROJECT_DIR}/deploy/production/db/values.yaml
    fi
    # uncomment block if commented e.g. `# appears twice as in regex`
    if grep -Fxq "##__START_BUILD_${IMAGE_NAME}_IMAGE_BLOCK__" .rancher-pipeline.yml; then
      sed -i "/#__START_BUILD_${IMAGE_NAME}_IMAGE_BLOCK__/,/#__END_BUILD_${IMAGE_NAME}_IMAGE_BLOCK__/ s/#//" .rancher-pipeline.yml
    fi
  else
    # comment block if uncommented e.g. `# does not appear twice as in regex`
    if ! grep -Fxq "##__START_BUILD_${IMAGE_NAME}_IMAGE_BLOCK__" .rancher-pipeline.yml; then
      sed -i "/#__START_BUILD_${IMAGE_NAME}_IMAGE_BLOCK__/,/#__END_BUILD_${IMAGE_NAME}_IMAGE_BLOCK__/ s/^/#/" .rancher-pipeline.yml
    fi
  fi
}

echo ===========================================================================
echo " Starting deployment to ${1}..."

case "$1" in
  staging)
    set -a && source ./.env

    if ! docker network ls | grep ph_ph-net > /dev/null; then
        echo ===========================================================================
        echo " !!! Please start your local stack first !!!"
        echo ===========================================================================
        exit 1
    fi

    # display current versions
    CURRENT_GRAPHQL_IMAGE_TAG=$(echo "console.log(require('./graphql/package.json').version);" | node)
    if [[ ${DEPLOY_GRAPHQL_IMAGE_TAG} != ${CURRENT_GRAPHQL_IMAGE_TAG} ]]; then
      DIFF_GRAPHQL_IMAGE_TAG='current: '${CURRENT_GRAPHQL_IMAGE_TAG}
    fi

    CURRENT_ADMIN_IMAGE_TAG=$(echo "console.log(require('./web/admin/package.json').version);" | node)
    if [[ ${DEPLOY_ADMIN_IMAGE_TAG} != ${CURRENT_ADMIN_IMAGE_TAG} ]]; then
      DIFF_ADMIN_IMAGE_TAG="current: ${CURRENT_ADMIN_IMAGE_TAG}"
    fi

    CURRENT_CLIENT_IMAGE_TAG=$(echo "console.log(require('./web/client/package.json').version);" | node)
    if [[ ${DEPLOY_CLIENT_IMAGE_TAG} != ${CURRENT_CLIENT_IMAGE_TAG} ]]; then
      DIFF_CLIENT_IMAGE_TAG="current: ${CURRENT_CLIENT_IMAGE_TAG}"
    fi

    CURRENT_WIDGET_IMAGE_TAG=$(echo "console.log(require('./web/widget/package.json').version);" | node)
    if [[ ${DEPLOY_WIDGET_IMAGE_TAG} != ${CURRENT_WIDGET_IMAGE_TAG} ]]; then
      DIFF_WIDGET_IMAGE_TAG="current: ${CURRENT_WIDGET_IMAGE_TAG}"
    fi

    CURRENT_ORGANIC_IMAGE_TAG=$(echo "console.log(require('./organic/package.json').version);" | node)
    if [[ ${DEPLOY_ORGANIC_IMAGE_TAG} != ${CURRENT_ORGANIC_IMAGE_TAG} ]]; then
      DIFF_ORGANIC_IMAGE_TAG="current: ${CURRENT_ORGANIC_IMAGE_TAG}"
    fi

    CURRENT_IMAGE_RESIZER_IMAGE_TAG=$(echo "console.log(require('./scripts/storage/minio-image-resizer/package.json').version);" | node)
    if [[ ${DEPLOY_IMAGE_RESIZER_IMAGE_TAG} != ${CURRENT_IMAGE_RESIZER_IMAGE_TAG} ]]; then
      DIFF_IMAGE_RESIZER_IMAGE_TAG="current: ${CURRENT_IMAGE_RESIZER_IMAGE_TAG}"
    fi

    echo ===========================================================================
    echo " !!! Following versions will be deployed to ${1} !!!"
    echo
    printf " DB:            %s \t %s\n" "${DEPLOY_DB_IMAGE_TAG:-missing}"
    printf " GRAPHQL:       %s \t %s\n" "${DEPLOY_GRAPHQL_IMAGE_TAG:-missing}" "${DIFF_GRAPHQL_IMAGE_TAG}"
    printf " ADMIN:         %s \t %s\n" "${DEPLOY_ADMIN_IMAGE_TAG:-missing}" "${DIFF_ADMIN_IMAGE_TAG}"
    printf " CLIENT:        %s \t %s\n" "${DEPLOY_CLIENT_IMAGE_TAG:-missing}" "${DIFF_CLIENT_IMAGE_TAG}"
    printf " WIDGET:        %s \t %s\n" "${DEPLOY_WIDGET_IMAGE_TAG:-missing}" "${DIFF_WIDGET_IMAGE_TAG}"
    printf " ORGANIC:       %s \t %s\n" "${DEPLOY_ORGANIC_IMAGE_TAG:-missing}" "${DIFF_ORGANIC_IMAGE_TAG}"
    printf " IMAGE_RESIZER: %s \t %s\n" "${DEPLOY_IMAGE_RESIZER_IMAGE_TAG:-missing}" "${DIFF_IMAGE_RESIZER_IMAGE_TAG}"
    echo ===========================================================================
    read -p " Are you sure you want to proceed? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        echo
        echo
        echo ===========================================================================
        echo " To update your .env file use:"
        echo ===========================================================================
        echo
        echo "DEPLOY_DB_IMAGE_TAG=${DEPLOY_DB_IMAGE_TAG}"
        echo "DEPLOY_GRAPHQL_IMAGE_TAG=${CURRENT_GRAPHQL_IMAGE_TAG}"
        echo "DEPLOY_ADMIN_IMAGE_TAG=${CURRENT_ADMIN_IMAGE_TAG}"
        echo "DEPLOY_CLIENT_IMAGE_TAG=${CURRENT_CLIENT_IMAGE_TAG}"
        echo "DEPLOY_WIDGET_IMAGE_TAG=${CURRENT_WIDGET_IMAGE_TAG}"
        echo "DEPLOY_ORGANIC_IMAGE_TAG=${CURRENT_ORGANIC_IMAGE_TAG}"
        echo "DEPLOY_IMAGE_RESIZER_IMAGE_TAG=${CURRENT_IMAGE_RESIZER_IMAGE_TAG}"
        echo
        echo ===========================================================================
        echo
        echo
        exit 1
    fi

    # start staging release
    export PROJECT_DIR=`git rev-parse --show-toplevel`

    git checkout master && \
    git pull origin master && \
    git push origin master

    npm version ${2:-patch}

    toogle_build_step DB $DEPLOY_DB_IMAGE_TAG
    toogle_build_step GRAPHQL $DEPLOY_GRAPHQL_IMAGE_TAG "graphql"
    toogle_build_step ADMIN $DEPLOY_ADMIN_IMAGE_TAG "web/admin"
    toogle_build_step CLIENT $DEPLOY_CLIENT_IMAGE_TAG "web/client"
    toogle_build_step WIDGET $DEPLOY_WIDGET_IMAGE_TAG "web/widget"
    toogle_build_step ORGANIC $DEPLOY_ORGANIC_IMAGE_TAG "organic"
    toogle_build_step IMAGE_RESIZER $DEPLOY_IMAGE_RESIZER_IMAGE_TAG "scripts/storage/minio-image-resizer"

    chmod o+w $PROJECT_DIR/db/migrations/sqitch.plan && \
    npm run sqitch-tag && \
    git add $PROJECT_DIR/db/migrations/sqitch.plan && \
    git add $PROJECT_DIR/.rancher-pipeline.yml && \
    git commit --amend --no-edit && \
    git push --tags origin master && \
    git checkout staging && \
    git pull origin staging && \
    git merge master && \
    git push origin staging && \
    git checkout master
    ;;
  production)
    # start production release
    git checkout production && \
    git pull origin production && \
    git pull origin staging && \
    git push origin production && \
    git checkout master
    ;;
  *)
    echo $"$0 invalid deployment environment $1"
    exit 1
    ;;
esac

echo ===========================================================================
echo " Triggered deployment to ${1}."
echo ===========================================================================

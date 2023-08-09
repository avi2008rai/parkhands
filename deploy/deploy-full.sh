#!/bin/bash

# fail and abort on error
set -e

# load .env configuration variables
set -a ; source .env ; set +a

# synchronize target branch
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
git checkout "$CICD_GIT_BRANCH"
git merge --ff "$CURRENT_BRANCH"
git push
git checkout "$CURRENT_BRANCH"

# run playbook
ansible-playbook -i deploy/inventory deploy/pipeline_prepare_resources.yaml -v

# deploy basic resources like common secrets and config maps
kubectl apply --namespace="$CICD_GIT_BRANCH" -f "./deploy/$CICD_GIT_BRANCH/parkhands-initial.yaml"

# install postgres chart
helm upgrade --install postgresql-ha ./deploy/charts/postgresql-ha \
  --namespace="$CICD_GIT_BRANCH" \
  -f "./deploy/$CICD_GIT_BRANCH/db/values.yaml"

# deploy the actual parkhands workload manifests
kubectl apply --namespace="$CICD_GIT_BRANCH" -f "./deploy/$CICD_GIT_BRANCH/parkhands-resources.yaml"

# create docker registry access secret
kubectl create secret docker-registry parkhands-registry-secret \
  --namespace "${CICD_GIT_BRANCH}" \
  --docker-server="${REGISTRY_BASE_URL%%/*}" \
  --docker-username="${REGISTRY_USERNAME}" \
  --docker-password="${REGISTRY_PASSWORD}" \
  --dry-run=client -o yaml | kubectl apply -f -

# create git repo access secret
kubectl create secret generic github-credentials \
  --namespace "${CICD_GIT_BRANCH}" \
  --from-literal username="$GIT_USERNAME" --from-literal password="$GIT_PASSWORD" \
  --dry-run=client -o yaml | kubectl apply -f -

echo "Done"

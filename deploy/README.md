# Deployment Instructions

**Note:** These are temporary and to be adapted once a proper pipeline and infrastructure is set up. It is meant for **
local, manual deployment**.

We use a very simplified workflow adapted from the provided [Rancher pipeline declaration](../.rancher-pipeline.yml).

First, check that your `.env` configuration is set correctly. It is enough to source it once per shell session, but 
you must not forget to source it again after each change to the file, therefore it is included in all snippets below.

Most of the steps are included in [deploy-full.sh](./deploy-full.sh), which just relies on your [.env](../.env) 
configuration and already pre-built and pushed images.

## Building

The simplest way to build all images locally is to run `npm run stack-up-complete` (which will also start all 
services locally) or just by:

```bash
# load .env configuration variables
set -a ; source .env ; set +a
# build all images
docker-compose build
```

## Docker Registry

Make sure all containers are pushed to a docker registry reachable by your target k8s cluster.

If you built them locally using `docker-compose` (or the `npm` wrapper script). you might then have to re-tag your 
local images to include the registry, and then you can push them.
Note that this uses a static, equal version tag for all images. Later you will probably need to set individual
versions per image.

```bash
# load .env configuration variables
set -a ; source .env ; set +a
COMMON_IMAGE_VERSION='1.0.0'
# retag and push local images
for IMAGE in ph_image_resizer ph_organic ph_widget ph_client ph_admin ph_graphql ph_postgresql-repmgr ; do
  docker tag "${IMAGE}" "${REGISTRY_BASE_URL}/${IMAGE}:${COMMON_IMAGE_VERSION}"
  docker push "${REGISTRY_BASE_URL}/${IMAGE}:${COMMON_IMAGE_VERSION}"
done
```

## Manifest templating

The current setup uses Ansible for local templating. *TODO: Migrate to Helm*

Run the [pipeline_prepare_resources.yml](./pipeline_prepare_resources.yaml) playbook to generate/modify the manifest
templates in your local directory:

```bash
# load .env configuration variables
set -a ; source .env ; set +a
# run playbook
ansible-playbook -i deploy/inventory deploy/pipeline_prepare_resources.yaml -v
```

This creates (or modifies <!> ) the following files - do not commit those changes!

```
.tags
.CICD_NAMESPACE
.CICD_TEST_NAMESPACE
deploy/{staging,production}/parkhands-initial.yaml
deploy/{staging,production}/parkhands-resources.yaml
deploy/test/parkhands-test-resources.yaml
deploy/test/jobs/*.yaml   <!>
```

## Kubernetes Deployment

Configure `kubectl` to use the correct cluster/context. We will deploy all resources to the namespace defined in
`$CICD_GIT_BRANCH`, which should be either "staging" or "production". Since we expect the namespace to be already 
created manually via the Rancher UI, as part of a Rancher Project, that part of the manifests is commented out here.

Below we assume a "staging" deployment. Replace with "production" if necessary.

Since we are not using Helm except for the Postgres database chart, we have to deploy the generated manifests in order,
so that dependencies are resolved. Also wait until all resources are ready after each step.

```bash
# load .env configuration variables
set -a ; source .env ; set +a
# deploy basic resources like common secrets and config maps
kubectl apply --namespace=$CICD_GIT_BRANCH -f ./deploy/$CICD_GIT_BRANCH/parkhands-initial.yaml
# install postgres chart
helm upgrade --install postgresql-ha ./deploy/charts/postgresql-ha \
  --namespace=$CICD_GIT_BRANCH \
  -f ./deploy/$CICD_GIT_BRANCH/db/values.yaml
# deploy the actual parkhands workload manifests
kubectl apply --namespace=$CICD_GIT_BRANCH -f ./deploy/$CICD_GIT_BRANCH/parkhands-resources.yaml
```

The above workloads may fail to deploy successfully at first, because they require additional secrets to run, 
including an access token for the git repository and for the docker registry. You need to create them manually.

## Manually created secrets

Create a `docker-registry` type secret named `parkhands-registry-secret` in your target namespace (as defined in
`$CICD_GIT_BRANCH`, i.e. "staging" or "production") that contains the necessary authentication token to pull from
that registry:

```bash
# load .env configuration variables
set -a ; source .env ; set +a
# create secret
kubectl create secret docker-registry parkhands-registry-secret \
  --namespace "${CICD_GIT_BRANCH}" \
  --docker-server="${REGISTRY_BASE_URL%%/*}" \
  --docker-username="${REGISTRY_USERNAME}" \
  --docker-password="${REGISTRY_PASSWORD}"
```

The containers will need to pull the git repository during initialization to fetch database migration scripts.
For this we need to create a deploy token and add it as secret named `github-credentials` to the cluster:

```bash
# load .env configuration variables
set -a ; source .env ; set +a
# create secret
kubectl create secret generic github-credentials \
  --namespace "${CICD_GIT_BRANCH}" \
  --from-literal username="$GIT_USERNAME" --from-literal password="$GIT_PASSWORD"
```

It will be used to fetch the repo at `$GIT_CLONE_URL`, which has to be configured as HTTPS URL including the variables.

## Post-Install:

The app comes with two default users:

| Email                         | Password    | Role            |
|-------------------------------|-------------|-----------------|
| super_admin@parkhands.de      | 12345678    | Administrator   |
| single_member@parkhands.de    | 12345678    | Regular User    |

To create a new user, use the App web-interface (SignUp button) and register with your email address.
An admin can manually enable the account if email-verification (depends on sendgrid) fails, and also 
promote it to become another administrator or any other role.

## Database Troubleshooting

Forward port 5432 for postgresql via:

```bash
kubectl port-forward postgresql-ha-postgresql-0 5432
```

Get password for db user `postgres` via:

```bash
kubectl get secret env-secrets -o jsonpath="{.data.postgresql-password}" | base64 -d
```

Connect to the database using `psql` via (enter the password that was revealed
in the previous step):
```bash
psql -h localhost -p 5432 --user postgres
```

Switch to the app database via:

```sql
\c app;
```

### Modifying App Users

List all available users via (copy the user ID):
```sql
select * from api.user;
```

Enable/Activate the newly created user via:

```sql
update api.user SET status = 'enabled' WHERE status = 'pending';
```

Promote the user to admin via:
```sql
update api.user SET role = 'app_super_admin' where id = '<USER_ID>';
```

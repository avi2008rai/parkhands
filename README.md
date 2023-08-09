# Parkhands

## Requirements

- Docker
- Node.js

## First setup

### Provide settings for local setup via ./.env

```bash
# Clone example environment file in root directory
cp .env.example .env
```
Adjust settings in .env to customize setup

### Install dependencies
```bash
# Install all dependencies
npm run init-cells
```

### Ensure that all bash scripts are executable
```bash
# set executable persmissions on some dev scripts, if requested
chmod +x ./scripts/db/sqitch.sh
chmod +x ./scripts/db/insider.sh
chmod +x ./scripts/db/db_export.sh
chmod +x ./scripts/db/db_import.sh
chmod +x ./scripts/db/minio-client-cp.sh
chmod +x ./scripts/dev/stripe-listen.sh
chmod +x ./scripts/init.sh
chmod +x ./scripts/deploy.sh
chmod +x ./scripts/test/test-db.sh
chmod +x ./scripts/test/test-api.sh
chmod +x ./scripts/test/test-api-debug.sh
chmod +x ./scripts/test/test-api-watch.sh
chmod +x ./scripts/test/test-organic.sh
chmod +x ./scripts/tools/graphql-playground/run.sh
chmod +x ./scripts/tools/graphql-voyager/run.sh
```

### Launch backend

```bash
npm run stack-up
```
*ATTENTION!* If you want to work with a stack (or just the database) running on
a remote host, you must instead use:
```bash
npm run stack-up-vanilla-db

```
You must then run the (initial) sqitch deployment manually via:
```bash
npm run sqitch deploy --target db:pg://<username>:<password>@<host>:<port>/app
```

OR you can use the script `./sqitch-remote.sh` like this:
```bash
REMOTE_DB_HOST=<host-ip> REMOTE_DB_PORT=<db port> ./sqitch-remote.sh
```

The env vars may be added to the `.env` file.

### Launch client frontend

```bash
npm run client-dev
```
You can now access the client application via your browser at the port specified
in env var `CLIENT_PORT` (default is `3777`).

## Development

### Adjusting the resource consumption (mem/cpu) when developing locally

#### Linux/OSX
In order to limit the memory/cpu that can be consumed by the docker containers
when running the application stack locally, it is possible to adjust the
resource limits per container. Each service (which will launch a container) has
a `resources` section, that contains limits for both cpu and memory. If the
resources usage is too high, or you want to provide more resources to the
containers to speed up your workflow, you can change the resource limits in the
`resources` section for the service in the `docker-compose.yml`.

#### Windows
The resources limits for cpu and memory will not take effect on Windows. To
configure resource limits for windows, please use the settings for docker on
windows. See: https://docs.docker.com/docker-for-windows/#resources for more
details.


Below you see the current default settings for the database:

```yaml

  db-0:
    image: ph_postgresql-repmgr:latest
    deploy:
      resources:
        limits:
          cpus: '1.00'
          memory: 1024M
        reservations:
          memory: 512M
```

```bash
# If you want to develop only backend
npm run stack-up
# OR
npm run stack-up-backend

# If you want to develop frontend too
npm run stack-up
npm run admin-dev
npm run client-dev
npm run widget-dev

# To run all containers including admin and client
npm run stack-up-complete

# To run backend containers without sqitch migrations afterwards
npm run stack-up-vanilla-db

# To stop all docker images
npm run stack-down

# To restart all docker images related to backend.
npm run stack-restart

# To rebuild all docker images and start stack
npm run stack-rebuild

# To rebuild all docker images and remove all volumes.
npm run stack-clean

# To remove database volume.
npm run stack-clean-db

# To remove storage volume.
npm run stack-clean-storage

# To run Stripe webhook handler (Keep in mind that Staging server also receives the events in parallel)
npm run stripe-webhook-dev

# To perform a local backup of the database
npm run backup-db

# To restore the database based on a local backup
npm run restore-db

# To print the details for all registered API-users: (requires psql to be
installed)
npm run show-api-users

# To fetch all parking spaces from graphql with the credentials of the default
super-admin
npm run query-parking-slots

# To generate a jwt token (defaults to generate for user
"super_admin@parkhands.de")
- requires jq, openssl and base64 to be installed (check via: which jq base64 openssl)
npm run gen-jwt-token

```

The GraphQL API should be available directly at <http://localhost:5000/graphql>

An in-browser IDE for exploring GraphQL API should be available at <http://localhost:5000/graphiql>

The client application should be available at <http://localhost:3777/>
The admin panel should be available at <http://localhost:1337/>

## Database

#### Persistance

See [Persistence and connection guide](https://github.com/diconium/Parkhands/blob/master/db/README.md)

#### Migrations

See [Migration guide](https://github.com/diconium/Parkhands/blob/master/db/migrations/README.md)

## How to test

1. Start developing by bringing up the local docker cluster as described above. All of the tests
   command below are reusing this docker cluster by first dumping the DB, doing tests and after that
   restoring the DB with its previous data.

2. Do some test code updates in `./graphql/test` folder or in `db/migrations/test`

- `$ npm run test` for running all tests (pgTap + API tests + tests in Organic container)
- `$ npm run test-db` to run only pgTap tests [`Click`](#How-PgTap-tests-work) to know `How PgTap tests work`
- `$ npm run test-api` to run only mocha/shouldjs GraphQL API tests
- `$ npm run test-api-debug` to run only mocha/shouldjs GraphQL API tests without restore on database after run
- The `$ npm run test-api` and `$ npm run test-api-debug` covers the test cases for country, slot, translation, user and vehicle APIs written in Mocha script. To add new test cases for APIs, add test scripts in `./graphql/test`
- `$ npm run test-organic` to run only mocha/shouldjs inside Organic container. Refer `./organic/README.md` for more details

### UI Testing

#### Development

1. `$ npm run admin-dev` to start development server
2. `$ npm run test-admin-dev` to run test suite in [Cypress](https://www.cypress.io/) runner.
Refer `/web/admin/test/README.md` for steps to run tests in `Cypress`

#### CI

- `$ npm run test-admin` to run inside CI

## Deploy

- to staging: `npm run deploy-staging`. Type of semantic version is accepted as argument. If omitted, default is `patch`.
- to staging: `npm run deploy-staging minor`
- to staging: `npm run deploy-staging major`
- to production: `npm run deploy-production`

## Make a local mirror

To make a mirror of staging/production environment into local stack, we have to fetch latest database backup from remote backup server and then import it locally.

1. First add `BACKUP_MINIO_*` vars from remote backup server into your `.env` file.

2. Then use one of the following commands to download database dump:

- `npm run db-export-staging`
- `npm run db-export-production`

3. And import it into your `running` local stack:

- `npm run db-import-local`

## Logs

- for database logs: `npm run logs-db`
- for GraphQL logs: `npm run logs-graphql`
- for Admin logs: `npm run logs-admin`
- for Client logs: `npm run logs-client`
- for Client logs: `npm run logs-widget`
- for Organic logs: `npm run logs-organic`
- for Image Resizer logs: `npm run logs-image-resizer`

## GraphQL Dev Tools

- GraphQL Playground: `npm run graphql-playground`
- GraphQL Voyager: `npm run graphql-voyager`
- Codegen Schema Update: `npm run graphql-gen-types` - Regenerate web/admin and web/client schema TS files

## Graphql Development:

* use `graphql-voyager` for visual overview over data structure at the level of
    graphql
* use graphiql (localhost:5000/graphiql) for working on/with graphql
    queries/mutations
    * In graphiql, use the "Headers" button, to provide a JWT token for
        authentication. An JWT token can be generated via `npm run
        gen-jwt-token` (see `scripts/dev/generate_jwt_token.sh` for details on
        how to use it).
        Example:
        ```json
        {
            "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IjAwMDEiLCJpc3MiOiJwb3N0Z3JhcGhpbGUiLCJpYXQiOjE2Mjg4NDMyNzEsImV4cCI6MTYyODg0Njg3MX0.eyJpZCI6ImZiYzBjYzUzLTYwMmItNGFiNi1iNjVhLWZlOGU2MGM1N2EwOSIsInJvbGUiOiJhcHBfc3VwZXJfYWRtaW4iLCJhdWQiOiJwb3N0Z3JhcGhpbGUifQ._vDQvL5Cy_0k3_v0333MQHCpc1LE1qrC0S5zUkWyb-4"
        }
        ```

### Example queries:

## Parking slots

Create a new parking slot:
```graphql
mutation MyMutation {

  __typename
  createSlot(
    input: {
      slot: {
        name: "new parking slot  test",
        pricePerHour: "5",
        vehicleSizeId: "<vehicle_size_id>",
        location: {
          type: "Point"
          coordinates: [10.5266837693115, 52.2682170367323]
          crs: {
            type: "name"
            properties: { name: "urn:ogc:def:crs:EPSG::4326" }
          }
        }
      }
    }
  ) {
    clientMutationId
  }
}
```

Delete a parking slot:
```graphql
mutation MyMutation {
	__typename
	deleteSlot(
		input: {
			id: "<parking_slot_id>"
		}) {
		clientMutationId
		deletedSlotNodeId
	}
}
```

Update the parking slot with the different patch details:

```graphql
mutation MyMutation {
	__typename
	updateSlot(
		input: {
			patch: {
				name: "Test",
				category: PRIVATE
			},
			id: "<parking_slot_id>"
		}) {
		clientMutationId
	}
}

```

## Grafana

Grafana should be available at <http://localhost:3000/>
The main purpose is a monitoring tool for administrator.
It consists dashboards with charts and graphics generated for specific features.
Default credentials are `admin:secret`.

## How PgTap tests work

The `pg_prove` is a command-line application to run one or more pgTAP tests in a PostgreSQL database. The output of the tests is harvested and processed by TAP::Harness in order to summarize the results of the test.

The test here are written as SQL scripts, which consist of a series of SQL statements that output TAP (Test Anything Protocol).
To add new tests for DB add the SQL scripts to `db/migrations/test` and run the tests by passing the list of SQL script names or the name of a test directory to pg_prove.

Refer `/db/README.md` for more detailed information on DB tests and sqitch.

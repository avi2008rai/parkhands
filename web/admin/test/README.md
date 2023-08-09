# UI Tests

UI tests are done via Cypress test runner <https://www.cypress.io/>

## Running in CI environment (via Docker image)

- [Cypress CI Docs](https://docs.cypress.io/guides/guides/continuous-integration.html)
- [Cypress Docker images](https://github.com/cypress-io/cypress-docker-images)

Install minimal dependencies that are mandatory for building the tests (typescript, babel-eslint, etc).

One of the main ideas here is to avoid pulling the npm dependency to `cypress` as it's huge and we don't need it when using the `cypress/included` docker image. The image already includes cypress installed globally in the test runner.

We achieve that by using `npm i --prod` which excludes `devDependencies` from being installed.

```bash
npm install --prefix web/admin/test --prod # Install minimal dependencies

docker run -it --network host -v $PWD/web/admin/test:/e2e -w /e2e --entrypoint=cypress cypress/included:4.5.0 run

```

## Running in local development environment (CLI)

Installs Cypress locally as npm dependency and run tests in CLI

```bash
npm install --prefix web/admin/test

npm run admin-dev # Run admin app
npm run test-admin # Run tests CLI
```

## Running in local development environment (interactive)

Installs Cypress locally as npm dependency and run tests in Cypress electron app

Install XLaunch-- And Launch (Only for Window)

Add -ac in Additional Parameters for VcXsrv file on Extra settings

```bash
npm install --prefix web/admin/test

npm run admin-dev # Run admin app
npm run test-admin-dev # Run cypress test app
```
To add new test suite, add spec files in `/web/admin/test/cypress`

# hmpps-person-record-manage-ui

[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/hmpps-person-record-manage-ui/badge?style=flat)](https://github-community.service.justice.gov.uk/repository-standards/hmpps-person-record-manage-ui)

[![Docker Repository on ghcr](https://img.shields.io/badge/ghcr.io-repository-2496ED.svg?logo=docker)](https://ghcr.io/ministryofjustice/hmpps-person-record-manage-ui)

## Running the app via docker-compose

The easiest way to run the app is to use docker compose to create the service and all dependencies.

`docker compose pull`

`docker compose up`

### Running the app for development

To start the main services excluding the example typescript template app:

`docker compose up --scale=app=0`

Create an environment file by copying `.env.example` -> `.env`
Environment variables set in here will be available when running `start:dev`

Install dependencies using `npm install`, ensuring you are using `node v20`

Note: Using `nvm` (or [fnm](https://github.com/Schniz/fnm)), run `nvm install --latest-npm` within the repository folder
to use the correct version of node, and the latest version of npm. This matches the `engines` config in `package.json`
and the github pipeline build config.

And then, to build the assets and start the app with esbuild:

`npm run start:dev`

### Logging in with a test user

Once the application is running you should then be able to login with:

username: CPR_MANAGE_ADMIN
password: password123456

## Running against a local version of hmpps-person-record and hmpps-person-match

This can be useful to test changes which need to be made to both apps.

1. In hmpps-person-record run `make e2e-test`
2. In hmpps-person-record run `make run-local`
3. In hmpps-person-record-manage-ui run `make run-local`

### Run linter

* `npm run lint` runs `eslint`.
* `npm run typecheck` runs the TypeScript compiler `tsc`.

### Run unit tests

`npm run test`

### Running integration tests

For local running, start a wiremock instance by:

`docker compose -f docker-compose-test.yml up`

Then run the server in test mode by:

`npm run start-feature` (or `npm run start-feature:dev` to run with auto-restart on changes)

And then either, run tests in headless mode with:

`npm run int-test`

Or run tests with the cypress UI:

`npm run int-test-ui`

### adding users

To request specific users and roles then raise a PR
to [update the seed data](https://github.com/ministryofjustice/hmpps-auth/blob/main/src/main/resources/db/dev/data/auth/V900_3__users.sql)
for the in-memory DB used by Auth

## Change log

A changelog for the service is available [here](./CHANGELOG.md)

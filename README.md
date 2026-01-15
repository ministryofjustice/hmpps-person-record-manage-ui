## Running the app via docker-compose

The easiest way to run the app is to use docker compose to create the service and all dependencies.

`docker compose pull`

`docker compose up`

### Running the app for development

To start the main services excluding the app:

`docker compose up --scale=app=0`

Create an environment file by copying `.env.example` -> `.env`
Environment variables set in here will be available when running `start:dev`


Note: Using `nvm` (or [fnm](https://github.com/Schniz/fnm)), run `nvm install --latest-npm` within the repository folder
to use the correct version of node, and the latest version of npm. This matches the `engines` config in `package.json`
and the github pipeline build config.

And then, to build the assets and start the app with esbuild:

`npm run start:dev`


### Logging in with a test user

Once the application is running you should then be able to login with:

username: CPR_MANAGE_ADMIN
password: password123456

to [update the seed data](https://github.com/ministryofjustice/hmpps-auth/blob/main/src/main/resources/db/dev/data/auth/V900_3__users.sql)
for the in-memory DB used by Auth

## Running against a local version of hmpps-person-record and hmpps-person-match

This can be useful to test changes which need to be made to both apps.

1. In hmpps-person-record run `make e2e-test`
2. In hmpps-person-record run `make run-local`
3. In hmpps-person-record-manage-ui run `make run-local`

4. To request specific users and roles then raise a PR

### Run linter

- `npm run lint` runs `eslint`.
- `npm run typecheck` runs the TypeScript compiler `tsc`.

### Run unit tests

`npm run test`

### Running integration tests

For local running, start a wiremock instance by:

`docker compose -f docker-compose-test.yml up`

Then run the server in test mode by:

`npm run start-feature` (or `npm run start-feature:dev` to run with auto-restart on changes)

After first install ensure playwright is initialised:

`npm run int-test-init:ci`

And then either, run tests in headless mode with:

`npm run int-test`

Or run tests with the UI:

`npm run int-test-ui`

## Keeping up to date with the template project

This project was cloned from [template typescript project](https://github.com/ministryofjustice/hmpps-template-typescript/) and it is important to keep up to date with improvements in the template, not least for security reasons.
The more this project looks like a standard HMPPS project, the easier it will be for new people to understand.

At the time of writing, no dependencies have been added to this project which are not in the template project, so we can even use the package-lock.json from the template.

To merge changes in the template project

```bash
git remote add -f template git@github.com:ministryofjustice/hmpps-template-typescript.git
git fetch template
git merge template/main --allow-unrelated-histories
```

This will bring in any changes since the last time the template project was merged. Fix the conflicts, merge and deploy.

## Change log

A changelog for the service is available [here](./CHANGELOG.md)

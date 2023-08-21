# Getting Started with Enhanced Preprints Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), then Next.JS added following <https://nextjs.org/docs/migrating/from-create-react-app>

## Running the tests - `yarn test`

To run the tests, run `yarn test`. 

## Linting Typescript - `yarn lint` or `yarn lint:fix`

To identify issues with Typescript, run `yarn lint`, to attempt to automatically fix the issues run `yarn lint:fix`

## Linting sass - `yarn lint-sass` or `yarn lint-sass:fix`

To identify issues with sass, run `yarn lint-sass`, to attempt to automatically fix the issues run `yarn lint-sass:fix`

## Development build - `docker-compose up` or `make start-dev`

To get started with a full development environment for the application, run `docker-compose up` and visit port [`localhost:8080`](http://localhost:8080). This will hot reload modules, styles and other things, but javascript is a requirement. The unproxied application server is viewable at [`localhost:3000`](http://localhost:3000).

The EPP API server can be viewed at [`localhost:3001`](http://localhost:3001)

You can also view a rudimentary mongodb GUI client at [`localhost:8081`](http://localhost:8081)

You can work with and view the component library via storybook at [`localhost:6006`](http://localhost:6006).

## Development build with local API - `SERVER_DIR="../your-directory-here" docker compose -f docker-compose.yaml -f docker-compose.localserver.yaml up`

To start the application with a local version of the [`EPP API server`](https://github.com/elifesciences/enhanced-preprints-server) so you can run the application and test local changes of the API, you need to define an environment variable `SERVER_DIR` with the location of your EPP API server project, i.e. `SERVER_DIR="../enhanced-preprints-server"`, then run the above command to invoke the `.localserver` ovverides.

## production build - `docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up` or `make start-prod`

To be able to see exactly what a production build will look and behave like, but using local services, we have provided an override command. You can use the command above to start the dev environment, but with the app server behaving like production would, for example without javascript and without incremental builds. This is not recommended for development, only for spot checking for differences between a prod build and dev build.
The app is still available at [`localhost:8080`](http://localhost:8080).

NOTE: this does not affect storybook, which runs the same in either prod or dev

## Recreating an issue experienced on production

When we are experiencing an issue in production that results in a kaboom then recreating the issue locally can be a quick and effective way to diagnose the problem. 

`API_SERVER=https://prod--epp.elifesciences.org MANUSCRIPT_CONFIG_FILE=/opt/epp-client/manuscripts.json docker compose up`

# Building

The build system depends on docker, buildx and make. You can build the production ready docker image using the `build-prod-and-push` make target, making sure to pass a IMAGE_REPO_PREFIX var pointing to your own container repository (which will be suffixed with `client`):

```
make IMAGE_REPO_PREFIX=yourdockerhubuser/enhanced-preprints- make build-prod-and-push
```

You can also build an image that runs storybook in dev mode for hosting as a pattern library (which will be suffixed with `storybook`):

```
make IMAGE_REPO_PREFIX=yourdockerhubuser/enhanced-preprints- make build-storybook-and-push
```

These are tagged and pushed automatically with `:latest`, `:{githash}` and `:{branchname}-{githas}-{timestamp}`. The images are built for linux/amd64 and linux/arm64 platforms.

# Running with a local import and server

```shell
IS_AUTOMATED=true docker compose up image-server yarn app nginx
```

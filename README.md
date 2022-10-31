# Getting Started with Enhanced Preprints Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), then Next.JS added following https://nextjs.org/docs/migrating/from-create-react-app

## Development build - `docker-compose up`

To get started with a full development environment for the application, run `docker-compose up` and visit port [`localhost:8080`](http://localhost:8080). This will hot reload modules, styles and other things, but javascript is a requirement. The unproxied application server is viewable at [`localhost:3000`](http://localhost:3000).

The EPP API server can be viewed at [`localhost:3001`](http://localhost:3001)

You can also view a rudimentary mongodb GUI client at [`localhost:8081`](http://localhost:8081)

## Storybook - `docker-compose --profile storybook up`

To work with and view the component library via storybook, run docker compose with the `storybook` profile. Visit [`localhost:6006`](http://localhost:6006) to view storybook.

## production build - `docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up`

To be able to see exactly what a production build will look and behave like, but using local services, we have provided an override command. You can use the command above to start the dev environment, but with the app server behaving like production would, for example without javascript. The app is still available at [`localhost:8080`](http://localhost:8080).

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

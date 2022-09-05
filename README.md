# Getting Started with Enhanced Preprints Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Building

The build system depends on docker, buildx and make. You can build the production ready docker image using the `build-prod-and-push` make target, making sure to pass a IMAGE_REPO_PREFIX var pointing to your own container repository (which will be suffixed with `client`):

```
make IMAGE_REPO_PREFIX=yourdockerhubuser/enhanced-preprints- make build-prod-and-push
```

You can also build an image that runs storybook in dev mode for hosting as a pattern library (which will be suffixed with `storybook`):
```
make IMAGE_REPO_PREFIX=yourdockerhubuser/enhanced-preprints- make build-storybook-and-push
```

These are tagged and pushed automatically with `:latest`, `:{githash}` and `:{branchname}-{githas}-{timestamp}`. The images are built for linux/amd64 and linux/arm64 platforms.

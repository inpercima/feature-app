# feature-app - frontend

## Getting started

```bash
# all commands used in ./frontend
cd frontend

# install tools and frontend dependencies
pnpm install
```

Create environment files for `development mode` and `production mode`.

```bash
cp src/environments/environment.ts src/environments/environment.dev.ts
cp src/environments/environment.ts src/environments/environment.mock.ts
cp src/environments/environment.ts src/environments/environment.prod.ts
```

**Note**: These files will not be under version control but listed in .gitignore.

## Usage

### Recommendation

It is recommanded to use a server to get full access of all angular.
You can do this for example with `yarn serve:mock`.
For the other options your app should run on a server which you like.

### Run in development mode

If you want to work with mock data, start the mock in a separate terminal, reachable on [http://localhost:3000/](http://localhost:3000/).

```bash
# mock, separate terminal
pnpm run:mock
```

```bash
# build, reachable on http://localhost/app/path/to/dist/
pnpm build:dev
# with mock
pnpm build:mock

# build and starts a server, rebuild after changes, reachable on http://localhost:4200/
pnpm serve:dev
# with mock
pnpm serve:mock
```

### Package

```bash
# build in production mode, compressed
pnpm build:prod
```

### Tests

```bash
# test
ng test

# e2e
ng e2e
```

## Configuration

### General

All options have to been set in the environment files but some of them do not need to be changed.
All defaults refer to the environment file (`environment.ts`), they are prepared in `development mode` (`environment.dev.ts`).
Change for `production mode` the option `production` to `true` and for `mock mode` the option `api` to `http://localhost:3000/`.

### Table of contents

* [api](#api)
* [appname](#appname)
* [defaultRoute](#defaultroute)
* [production](#production)
* [theme](#theme)

### `api`

Defines the URL to the backend.

* default: `./api/`
* type: `string`

### `appname`

Applicationwide title of the app, displayed in title and toolbar.

* default: `feature-app`
* type: `string`

### `defaultRoute`

The default route and the route to be redirected after a login if no route is stored or if a route does not exist.

* default: `feature`
* type: `string`

### `production`

Defines whether the app is in production or not.

* default: `false`
* type: `boolean`
* values: `true`/`false`

### `theme`

Name of a build-in theme from angular-material or a custom light or dark theme.

* default: `indigo-pink`
* type: `string`
* values: `deeppurple-amber`/`indigo-pink`/`pink-bluegrey`/`purple-green`/`custom-light`/`custom-dark`

To create a custom light or dark theme just edit the colors and themes in `themes.scss`.
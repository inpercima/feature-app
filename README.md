# feature-app

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
[![dependencies Status](https://david-dm.org/inpercima/feature-app/status.svg)](https://david-dm.org/inpercima/feature-app)
[![devDependencies Status](https://david-dm.org/inpercima/feature-app/dev-status.svg)](https://david-dm.org/inpercima/feature-app?type=dev)

Administrate and manage features on an account like ig_* on instagram.

A demo version is online under [feature-app.inpercima.net](http://feature-app.inpercima.net) with username = password = **feature-app**.

This project was generated with [swaaplate 0.2.0](https://github.com/inpercima/swaaplate).

## Prerequisites

### Node, npm or yarn

* `node 8.11.3` or higher in combination with
  * `npm 5.6.0` or higher or
  * `yarn 1.7.0` or higher, used in this repository

### Angular CLI

* `angular-cli 7.0.6` or higher

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/feature-app
cd feature-app

# copy src/config.default.json to src/config.json
cp src/config.default.json src/config.json

# install tools and frontend dependencies
yarn
```

## Usage

### Recommendation

It is recommanded to use a server to get full access of all angular.
You can do this for example with `yarn serve:dev`.
For the other options your app should run on a server which you like.

### DevMode with mock data

Start in a separate terminal a server with mock data, reachable on [http://localhost:3000/](http://localhost:3000/).

```bash
yarn mock:dev
```

Chose one of the following to work in devMode with mock data.

```bash
# build, reachable on http://localhost/app/path/to/dist/
yarn build:dev

# build and starts a server, rebuild after changes, reachable on http://localhost:4200/
yarn serve:dev

# build, rebuild after changes, reachable on http://localhost/app/path/to/dist/
yarn watch:dev
```

### DevMode with real data, if present

```bash
# build, reachable on http://localhost/app/path/to/dist/
yarn build:stage

# build, rebuild after changes, reachable on http://localhost/app/path/to/dist/
yarn watch:stage
```

### ProdMode

```bash
# build in prodMode, compressed
yarn build:prod
```

### Tests

```bash
# test
ng test

# e2e
# WORKAROUND
# before running ng e2e you need to run following line to download webdriver
node_modules/protractor/bin/webdriver-manager update

ng e2e
```

## Configuration

### General

All options have to bet set in the environment files but some of them do not need to be changed.
All defaults refer to the development environment file (`environment.ts`).
All deviations are described in addition as `staging` and `production`.

### Table of contents

* [activateLogin](#activateLogin)
* [api](#api)
* [apiSuffix](#apiSuffix)
* [appname](#appname)
* [defaultRoute](#defaultRoute)
* [production](#production)
* [redirectNotFound](#redirectNotFound)
* [showFeatures](#showFeatures)
* [showLogin](#showLogin)
* [theme](#theme)

### `activateLogin`

Defines whether a login will be used or not.

* default: `true`
* type: `boolean`
* values: `true`/`false`

### `api`

Defines the URL to the backend.

* default: `http://localhost:3000/` | staging: `./` | production: `./`
* type: `string`

### `apiSuffix`

Defines a suffix for the api to the backend.

* default: `EMPTY` | staging: `.php` | production: `.php`
* type: `string`

### `appname`

Applicationwide title of the app, displayed in title and toolbar.

* default: `feature-app`
* type: `string`

### `defaultRoute`

The main route and the redirect route after login if no route is stored.

* default: `feature`
* type: `string`

### `production`

Defines whether the app is in production or not.

* default: `false` | staging: `false` | production: `true`
* type: `boolean`
* values: `true`/`false`

### `redirectNotFound`

Defines whether the 404 route will redirect to the default route or not.

* default: `false`
* type: `boolean`
* values: `true`/`false`

### `showFeatures`

Defines whether feature routes will be displayed or not.

* default: `true`
* type: `boolean`
* values: `true`/`false`

### `showLogin`

Defines whether login route will be displayed or not.

* default: `false`
* type: `boolean`
* values: `true`/`false`

### `theme`

Name of a build-in theme from angular-material.

* default: `indigo-pink`
* type: `string`
* values: `deeppurple-amber`/`indigo-pink`/`pink-bluegrey`/`purple-green`

Note: This option must also be changed in the angular.json if you want to change it.

# feature-app

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
[![dependencies Status](https://david-dm.org/inpercima/feature-app/status.svg)](https://david-dm.org/inpercima/feature-app)
[![devDependencies Status](https://david-dm.org/inpercima/feature-app/dev-status.svg)](https://david-dm.org/inpercima/feature-app?type=dev)

Administrate and manage features on an account like ig_* on instagram.

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate).

## Prerequisites

### Node, npm or yarn

* `node 8.11.3` or higher in combination with
  * `npm 5.6.0` or higher or
  * `yarn 1.7.0` or higher, used in this repository

### Angular CLI

* `angular-cli 7.0.2` or higher

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

```bash
# build in devMode
yarn build:dev

# build in prodMode, compressed
yarn build:prod

# build in devMode and start a server, rebuild after changes
yarn serve
# open result in browser
http://localhost:4200/

# test
ng test

# e2e
ng e2e
```

## Configuration

### General

All options have to bet set but some of them do not need to be changed.

### Table of contents

* [appname](#appname)
* [routes/default](#routesdefault)
* [routes/features/show](#routesfeaturesshow)
* [routes/login/activate](#routesloginactivate)
* [routes/login/show](#routesloginshow)
* [routes/notFound/redirect](#routesnotfoundredirect)
* [theme](#theme)

### `appname`

Applicationwide title of the app, displayed in title and toolbar.

* default: `feature-app`
* type: `string`

### `routes/default`

The main route and the redirect route after login if no route is stored.

* default: `feature`
* type: `string`

### `routes/features/show`

Defines whether feature routes will be displayed or not.

* default: `true`
* type: `boolean`
* values: `true`/`false`

### `routes/login/activate`

Defines whether a login will be used or not.

* default: `true`
* type: `boolean`
* values: `true`/`false`

### `routes/login/show`

Defines whether login route will be displayed or not.

* default: `false`
* type: `boolean`
* values: `true`/`false`

### `routes/notFound/redirect`

Defines whether the 404 route will redirect to the default route or not.

* default: `false`
* type: `boolean`
* values: `true`/`false`

### `theme`

Name of a build-in theme from angular-material.

* default: `indigo-pink`
* type: `string`
* values: `deeppurple-amber`/`indigo-pink`/`pink-bluegrey`/`purple-green`

Note: This option must also be changed in the angular.json if you want to change it after cloning the project.

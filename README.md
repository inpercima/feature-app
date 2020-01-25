# feature-app

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

Administrate and manage features on an account like ig_* on instagram.

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 1.1.0.

## Prerequisites

### Angular CLI

* `angular-cli 8.3.23` or higher

### Apache and php

* `Apache 2.4` or higher
* `php 7.3` or higher

### Node, npm or yarn

* `node 12.3.1` or higher in combination with
  * `npm 6.12.1` or higher or
  * `yarn 1.19.1` or higher, used in this repository

## Dependency check

Some libraries could not be updated b/c of peer dependencies or knowing issues.

| library    | current version | wanted version | reason |
| ---------- | --------------- | -------------- | ------ |
| copy-webpack-plugin | 4.6.0 | 5.1.1 | copy-webpack-plugin@5.1.1" has unmet peer dependency "webpack@^4.0.0 || ^5.0.0" |
| zone.js    | 0.9.1           | 0.10.2         | @angular/core@8.2.14" has incorrect peer dependency "zone.js@~0.9.1" |
| typescript | 3.5.3           | 3.7.4          | @angular-devkit/build-angular@0.803.23" has incorrect peer dependency "typescript@>=3.1 < 3.6 |
| typescript | 3.5.3           | 3.7.4          | @angular-devkit/build-angular > @ngtools/webpack@8.3.23" has incorrect peer dependency "typescript@>=3.4 < 3.6 |
| typescript | 3.5.3           | 3.7.4          | @angular/compiler-cli@8.2.14" has incorrect peer dependency "typescript@>=3.4 <3.6 |

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/feature-app
cd feature-app
```

## Usage

### Modules

For the client check [feature-app - client](https://github.com/inpercima/feature-app/tree/master/client).

For the api check [feature-app - api](https://github.com/inpercima/feature-app/tree/master/api).

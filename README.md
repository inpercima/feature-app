# feature-app

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

Administrate and manage features on an account like ig_* on instagram.

This project was generated with [swaaplate](https://github.com/inpercima/swaaplate) version 2.1.0.

## Prerequisites

### Angular CLI

* `angular-cli 11.0.5` or higher

### Apache and php

* `Apache 2.4` or higher
* `php 7.3` or higher

### Node, npm or yarn

* `node 12.19.0` or higher in combination with
  * `npm 6.14.8` or higher or
  * `yarn 1.22.5` or higher, used in this repository

## Dependency check

Some libraries could not be updated b/c of peer dependencies or knowing issues.

| library             | current version | wanted version | reason |
| ------------------- | --------------- | -------------- | ------ |
| copy-webpack-plugin | 4.6.0           | 7.0.0          | copy-webpack-plugin@7.0.0" has unmet peer dependency "webpack@^5.1.0" |
| typescript          | 4.0.5           | 4.1.3          | @angular-devkit/build-angular@0.1100.5" has incorrect peer dependency "typescript@~4.0.0" |
| zone.js             | 0.10.3          | 0.11.3         | @angular/core@11.0.5" has incorrect peer dependency "zone.js@~0.10.3" |

## Getting started

```bash
# clone project
git clone https://github.com/inpercima/feature-app
cd feature-app
```

## Usage

### Modules

For the client check [feature-app - client](./client).

For the server check [feature-app - api](./api).

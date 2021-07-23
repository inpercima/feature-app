# feature-app - api

## Getting started

```bash
# all commands used in ./api
cd api
```

Create config files for `devMode` and `prodMode`.

```bash
cp config/config.default.php config/config.dev.php
cp config/config.default.php config/config.prod.php
```

**Note**: This file will not be under version control but listed in .gitignore.

## Configuration

### Table of contents

* [JWT_KEY](#JWTKEY)
* [DB_HOST](#DBHOST)
* [DB_NAME](#DBNAME)
* [DB_PASS](#DBPASS)
* [DB_PREFIX](#DBPREFIX)
* [DB_USER](#DBUSER)

### `JWT_KEY`

Defines the json web token secret key.

* default: EMPTY
* type: `string`

### `DB_HOST`

Defines the hostname of the database.

* default: EMPTY
* type: `string`

### `DB_NAME`

Defines the database name.

* default: EMPTY
* type: `string`

### `DB_PASS`

Defines the password for the database.

* default: EMPTY
* type: `string`

### `DB_PREFIX`

Defines a prefix like `db1_` to use if multiple contextes exists on one database.

* default: EMPTY
* type: `string`

### `DB_USER`

Defines the user for the database.

* default: EMPTY
* type: `string`

## Integration

To use MySQL you need to import the script under `resources/fa_demo.sql` in your database.

# @sunly95/gen-version

[中文](./README.md) ｜ English

Upgrade package.json version and update CHANGLOG file

## Usage

### Install

```bash
yarn add @sunly95/gen-version@latest -D
```

### Use command to update version

```bash
npx -p @sunly95/gen-version update
```

### Use calling function to update version

#### commonJS

```js
// build/index.js
const main = require("@sunly95/gen-version")
main()
```

#### ESModule

```js
// build/index.js
import main from "@sunly95/gen-version"
main()
```

use `build/index.js` to generate `CHANGELOG.md` and update `package.json` version

### Use script to build

```
// package.json
{
  "script": {
    "build": "node ./build/index.js && yarn run build",
    "update:version": "npx -p @sunly95/gen-version update"
  }
}
```

run `npm run build` or `npm run update:version` to generate `CHANGELOG.md` and update `package.json` version

## Configuration

run `npx -p @sunly95/gen-version init` to generate `gen-version.config.json` file in root directory:

```bash
npx @sunly95/gen-version init
```

you can custom `gen-version.config.json`, default config is:

```
// gen-version.config.json
{
  title: "CHANGELOG",  // CHANGELOG Title
  checkVersion: true,  // Whether to check the version number
  changelogTemplate: [
    { "Feat": "Records what features/interfaces have been added" },
    { "Change": "Records changes in features/interfaces" },
    { "Fix": "Records what issues have been resolved" },
    { "Deprecated": "Features/interfaces that are not recommended and will be removed in the future" },
    { "Remove": "Features/interfaces that were previously not recommended and are now truly removed" },
    { "Style": "Records changes in style" },
    { "Type": "Records changes in type" },
    { "Other": "Records performance optimizations and security enhancements" }
  ] // CHANGELOG template, you can custom it
}
```

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## LICENSE

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

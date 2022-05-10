# @sunly95/gen-version

update version in package.json, and generate CHANGELOG

修改package.json版本号，并生成CHANGELOG.md

## USAGE

### install

```bash
yarn add @sunly95/gen-version -D
```

### generate entry file

`/build/index.js`
```js
const genVersion = require("@sunly95/gen-version")

genVersion()
```

### add npm script

`package.json`
```json
{
  "script": {
    "build": "node ./build/index.js && yarn run build"
  }
}
```

### build project and update version

```bash
yarn run build
```

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## LICENSE

[MIT LICENSE](./LICENSE)
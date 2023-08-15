# @sunly95/gen-version

中文 ｜ [English](./README_EN.md)

修改package.json版本号，并生成CHANGELOG.md

## 使用

### 安装

```bash
yarn add @sunly95/gen-version@latest -D
```

### 引入文件

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

每次调用`build/index.js`时就会自动生成`CHANGELOG.md`并修改`package.json`中的版本号

### 使用脚本配合build命令打包

```
// package.json
{
  "script": {
    "build": "node ./build/index.js && yarn run build"
  }
}
```

之后在打包时使用`yarn build`就可以直接调用`build/index.js`并打包

## 配置

运行命令：

```bash
npx @sunly95/gen-version init
```

会在项目根目录生成`gen-version.config.json`文件，可以自由配置，默认配置项如下：

```
// gen-version.config.json
{
  title: "CHANGELOG",  // CHANGELOG 标题
  checkVersion: true,  // 检查版本号是否符合 Major.Minor.Patch 的格式
  changelogTemplate: [
    { 新增: "这里记录新增加了哪些功能／接口" },
    { 更改: "这里记录更改了功能／接口变更" },
    { 修复: "这里记录解决了哪些问题" },
    { 废弃: "不建议使用的功能／接口，将来会删掉" },
    { 移除: "之前不建议使用的功能／接口，这次真的删掉了" },
    { 样式: "这里记录了样式的更改" },
    { 类型: "这里记录了类型的更改" },
    { 其他: "这里记录性能优化和安全性增强等改进" }
  ] // CHANGELOG 模板，可以自定义
}
```

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## LICENSE

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

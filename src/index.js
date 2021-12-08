/*
 * @Description: update version
 * @Author: Sunly
 * @Date: 2021-12-08 14:02:13
 */
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const { EOL } = require("os");
const { execSync } = require("child_process");
const dayjs = require("dayjs");
const packageFile = require(path.resolve(process.cwd(), "./package.json"));

function main() {
  console.log("\n上次构建版本: ", packageFile.version);

  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let version = "";

  input.question("\n请输入本次构建版本号: ", (ver) => {
    version = ver;
    input.close();
  });

  input.on("close", () => {
    if (version && /^[0-9]+.[0-9]+.[0-9]+$/.test(version)) {
      console.log("\n准备构建版本: ", version);

      packageFile.version = version;
      fs.writeFileSync(
        path.resolve(process.cwd(), "./package.json"),
        JSON.stringify(packageFile)
      );
      execSync("npx prettier --write ./package.json");
      fs.readFile(
        path.resolve(process.cwd(), "./CHANGELOG.md"),
        { encoding: "utf-8" },
        (err, data) => {
          let changeLogFile = data;
          if (err) {
            changeLogFile = `# 更新日志${EOL}${EOL}`;
            fs.writeFileSync(
              path.resolve(process.cwd(), "./CHANGELOG.md"),
              changeLogFile,
              { encoding: "utf-8" }
            );
          }
          const changeLogTemplate =
            `# 更新日志${EOL}${EOL}` +
            `## [${version}] - ${dayjs().format("YYYY-MM-DD")}${EOL}${EOL}` +
            `### Added${EOL}${EOL}- 这里记录新增加了哪些功能／接口 ${EOL}${EOL}` +
            `### Changed${EOL}${EOL}- 功能／接口变更 ${EOL}${EOL}` +
            `### Deprecated${EOL}${EOL}- 不建议使用的功能／接口，将来会删掉 ${EOL}${EOL}` +
            `### Removed${EOL}${EOL}- 之前不建议使用的功能／接口，这次真的删掉了 ${EOL}${EOL}` +
            `### Fixed${EOL}${EOL}- 这里记录解决了哪些问题 ${EOL}${EOL}` +
            `### Others${EOL}${EOL}- 这里记录性能优化和安全性增强等改进 ${EOL}${EOL}`;
          if (changeLogFile.includes(`[${version}]`)) {
            console.log("\n版本号已存在");
          } else if (/# 更新日志/.test(changeLogFile)) {
            changeLogFile = changeLogFile.replace(
              `# 更新日志${EOL}${EOL}`,
              changeLogTemplate
            );
          } else {
            changeLogFile = changeLogTemplate + changeLogFile + EOL + EOL;
          }
          fs.writeFileSync(
            path.resolve(process.cwd(), "./CHANGELOG.md"),
            changeLogFile,
            { encoding: "utf-8" }
          );
          console.log(`\n开始编译版本${version}...`);
        }
      );
    } else {
      throw Error("请输入正确版本号，格式：Major.Minor.Patch");
    }
  });
}

module.exports = main;

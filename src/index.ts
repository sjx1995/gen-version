/*
 * @Description: 主入口
 * @Author: Sunly
 * @Date: 2023-05-23 02:37:49
 */
import fs from "fs";
import { EOL } from "os";
import path from "path";
import readline from "readline";
import { defaultConfig, type IConfig } from "./config.js";

const CHANGELOG_PATH = path.resolve(process.cwd(), "./CHANGELOG.md");
const CONFIG_PATH = path.resolve(process.cwd(), "./gen-version.config.json");
const PACKAGE_PATH = path.resolve(process.cwd(), "./package.json");

function readConfig(): IConfig {
  let userConfig = "{}";
  if (fs.existsSync(CONFIG_PATH)) {
    userConfig = fs.readFileSync(CONFIG_PATH, "utf-8");
  }
  return { ...defaultConfig, ...JSON.parse(userConfig) };
}

function readPackageFile(): string {
  return fs.readFileSync(PACKAGE_PATH, "utf-8");
}

function getCurVersion(fileContent: string): [number, number] {
  const startVersion = fileContent.indexOf(`"version":`) + 10;
  const startIndex = fileContent.indexOf(`"`, startVersion) + 1;
  const endIndex = fileContent.indexOf(`"`, startIndex);
  console.log("\n当前构建版本：", fileContent.slice(startIndex, endIndex));
  return [startIndex, endIndex];
}

async function readUserInput(checkVersion: boolean): Promise<string> {
  function questionAsync(rl: readline.Interface, query: string) {
    return new Promise<string>((resolve) => {
      rl.question(query, resolve);
    });
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const newVersion = await questionAsync(rl, "\n请输入本次构建的版本号: ");
    rl.close();
    if (!newVersion) {
      throw new Error("版本号不能为空");
    }
    if (checkVersion && !/^[0-9]+.[0-9]+.[0-9]+$/.test(newVersion)) {
      throw new Error("请输入正确版本号，格式：Major.Minor.Patch");
    }
    return newVersion;
  } catch (error: any) {
    throw new Error("输入版本号发生错误 " + error.message);
  }
}

function updatePackageVersion(
  fileContent: string,
  start: number,
  end: number,
  newVersion: string
): void {
  fs.writeFileSync(
    PACKAGE_PATH,
    fileContent.slice(0, start) + newVersion + fileContent.slice(end)
  );
}

function createChangeLogTemplate(
  version: string,
  title: string,
  template: Record<string, string>[]
): string {
  const YEAR = new Date().getFullYear();
  const MONTH = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const DAY = new Date().getDate().toString().padStart(2, "0");
  const TODAY = `${YEAR}-${MONTH}-${DAY}`;

  return (
    `# ${title}${EOL}${EOL}` +
    `## [${version}] - ${TODAY}${EOL}${EOL}` +
    template
      .map((item) => {
        const key = Object.keys(item)[0];
        const value = Object.values(item)[0];
        return `### ${key}${EOL}${EOL}- ${value} ${EOL}`;
      })
      .join(EOL) +
    EOL
  );
}

function updateChangelog(
  newVersion: string,
  title: string,
  template: Record<string, string>[]
): void {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    try {
      fs.writeFileSync(CHANGELOG_PATH, `# ${title}${EOL}${EOL}`, {
        encoding: "utf-8",
      });
    } catch (error: any) {
      throw new Error("创建CHANGELOG.md失败 " + error.message);
    }
  }

  let changelogFile = "";
  try {
    changelogFile = fs.readFileSync(CHANGELOG_PATH, "utf-8");
    if (changelogFile.includes(`[${newVersion}]`)) {
      console.log("CHANGELOG.md中已存在该版本号\n");
    } else {
      const changeLogTemplate = createChangeLogTemplate(
        newVersion,
        title,
        template
      );
      if (changelogFile.startsWith(`# ${title}`)) {
        changelogFile = changelogFile.replace(
          `# ${title}${EOL}${EOL}`,
          changeLogTemplate
        );
      } else {
        changelogFile = changeLogTemplate + changelogFile + EOL + EOL;
      }
    }
  } catch (error: any) {
    throw new Error("更新CHANGELOG.md失败 " + error.message);
  }

  try {
    fs.writeFileSync(CHANGELOG_PATH, changelogFile, { encoding: "utf-8" });
  } catch (error: any) {
    throw new Error("写入CHANGELOG.md失败 " + error.message);
  }
}

async function main() {
  try {
    const { changelogTemplate, checkVersion, title } = readConfig();
    const packageFile = readPackageFile();
    const [replaceStart, replaceEnd] = getCurVersion(packageFile);
    const newVersion = await readUserInput(checkVersion);
    updatePackageVersion(packageFile, replaceStart, replaceEnd, newVersion);
    updateChangelog(newVersion, title, changelogTemplate);
    console.log("\n版本更新完成");
  } catch (error: any) {
    console.error(error.message);
  }
}

export default main;

#!/usr/bin/env node
/*
 * @Description: 使用命令行初始化配置文件
 * @Author: Sunly
 * @Date: 2023-05-23 09:01:22
 */
import fs from "fs";
import path from "path";
import { defaultConfig } from "./config.js";

const configFilePath = path.resolve(process.cwd(), "./gen-version.config.json");

if (fs.existsSync(configFilePath)) {
  console.log("配置文件已存在");
  process.exit(1);
} else {
  fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2), {
    encoding: "utf-8",
  });
  console.log("创建配置文件成功");
}

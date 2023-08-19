/*
 * @Description:
 * @Author: Sunly
 * @Date: 2023-08-16 06:54:50
 */
import { resolve } from "path";
import cleanup from "rollup-plugin-cleanup";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import addSheBang from "rollup-plugin-add-shebang";
import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: resolve(process.cwd(), "./src/index.ts"),
    output: [
      {
        file: resolve(process.cwd(), "./dist/index.cjs"),
        format: "cjs",
      },
      {
        file: resolve(process.cwd(), "./dist/index.mjs"),
        format: "esm",
      },
    ],
    plugins: [typescript(), terser(), cleanup()],
  },
  {
    input: resolve(process.cwd(), "./src/cli.ts"),
    output: [
      {
        file: resolve(process.cwd(), "./dist/cli.js"),
        format: "esm",
      },
    ],
    plugins: [
      typescript(),
      terser(),
      cleanup(),
      addSheBang({
        include: "./dist/cli.js",
      }),
    ],
  },
  {
    input: resolve(process.cwd(), "./src/update-version.ts"),
    output: [
      {
        file: resolve(process.cwd(), "./dist/update-version.js"),
        format: "esm",
      },
    ],
    plugins: [
      typescript(),
      terser(),
      cleanup(),
      addSheBang({
        include: "./dist/update-version.js",
      }),
    ],
  },
  {
    input: resolve(process.cwd(), "./src/index.ts"),
    output: [
      {
        file: resolve(process.cwd(), "./dist/index.d.ts"),
      },
    ],
    plugins: [dts()],
  },
];

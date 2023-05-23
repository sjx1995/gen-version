import { resolve } from "path";
import cleanup from "rollup-plugin-cleanup";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import addSheBang from "rollup-plugin-add-shebang";
import typescript from "rollup-plugin-typescript";

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
    plugins: [typescript(), terser(), cleanup(), addSheBang()],
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

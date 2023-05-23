import { resolve } from "path";
import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript";

export default [
  {
    input: resolve(process.cwd(), "./src/index.ts"),
    output: [
      {
        file: resolve(process.cwd(), "./dist/index.cjs.js"),
        format: "cjs",
      },
      {
        file: resolve(process.cwd(), "./dist/index.esm.js"),
        format: "es",
      },
    ],
    plugins: [typescript()],
  },
  {
    input: resolve(process.cwd(), "./src/index.ts"),
    output: [
      {
        file: resolve(process.cwd(), "./dist/index.esm.d.ts"),
      },
      {
        file: resolve(process.cwd(), "./dist/index.cjs.d.ts"),
      },
    ],
    plugins: [dts()],
  },
];

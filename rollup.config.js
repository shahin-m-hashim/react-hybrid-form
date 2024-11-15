import { dts } from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import sucrase from "@rollup/plugin-sucrase";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        format: "esm",
        sourcemap: true,
        file: packageJson.main,
      },
    ],
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        jsx: "preserve",
      }),
      sucrase({
        exclude: ["node_modules/**"],
        transforms: ["typescript", "jsx"],
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    external: [/\.css$/],
    plugins: [dts()],
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
  },
];

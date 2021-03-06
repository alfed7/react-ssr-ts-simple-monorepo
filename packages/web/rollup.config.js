const pkg = require("./package.json");

import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import replace from "rollup-plugin-replace";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;
const extensions = [".js", ".jsx", ".ts", ".tsx"];

console.log("production", production);

export default [
  {
    input: "./src/main.tsx",
    output: [
      {
        file: "build/main.js",
        format: "iife",

        // https://rollupjs.org/guide/en/#outputglobals
        //globals: {},
      },
    ],
    // external: [
    //   ...Object.keys(pkg.dependencies || {}),
    //   ...Object.keys(pkg.peerDependencies || {}),
    // ],
    plugins: [
      resolve({
        extensions,
      }),
      commonjs(),
      // typescript({
      //   exclude: ["**/*.test.ts?(x)"],
      // }),
      babel({
        exclude: /^(.+\/)?node_modules\/.+$/,
        extensions,
        babelHelpers: "runtime",
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      copy({
        targets: [{ src: "src/index.html", dest: "build" }],
      }),
      production && terser(),
    ],
  },
  {
    input: "./src/index.tsx",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      // resolve({
      //   extensions,
      // }),
      //commonjs(),
      typescript({
        exclude: ["**/*.test.ts?(x)"],
      }),
      babel({
        exclude: /^(.+\/)?node_modules\/.+$/,
        extensions,
        babelHelpers: "runtime",
      }),
      production && terser(),
    ],
  },
];

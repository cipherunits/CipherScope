import { defineConfig } from "tsup";

export default defineConfig([
  {
    format: ["cjs", "esm"],
    entry: { index: "./src/index.ts" },
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    tsconfig: "./tsconfig.json",
  },
  {
    format: ["cjs"],
    entry: { cli: "./src/cli.ts" },
    shims: true,
    skipNodeModulesBundle: true,
    clean: false,
    banner: {
      js: "#!/usr/bin/env node",
    },
    tsconfig: "./tsconfig.json",
  },
]);

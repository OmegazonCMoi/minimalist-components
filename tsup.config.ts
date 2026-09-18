import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["app/index.ts"],
    tsconfig: "tsconfig.lib.json",
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: ["react", "react-dom", "framer-motion", "lucide-react", "next"],
  },
  {
    entry: { cli: "cli/index.ts" },
    format: ["cjs"],
    platform: "node",
    target: "node18",
    dts: false,
    clean: false,
    sourcemap: false,
    minify: false,
    splitting: false,
    outExtension: () => ({ js: ".cjs" }),
    noExternal: [/.*/],
    esbuildOptions(options) {
      // Avoid empty import.meta in CJS — rewrite at build via define
      options.define = {
        ...options.define,
        "import.meta.url": "__cli_import_meta_url",
      };
    },
    banner: {
      js: [
        "var __cli_import_meta_url = require('url').pathToFileURL(__filename).href;",
      ].join(""),
    },
  },
]);

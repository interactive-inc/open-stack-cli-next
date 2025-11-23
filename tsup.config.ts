import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    hello: "cli.ts",
  },
  outDir: "bin",
  format: ["esm"],
  clean: true,
  dts: false,
  splitting: false,
  external: ["next"],
  bundle: true,
  platform: "node",
  target: "node20",
})

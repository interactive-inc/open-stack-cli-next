import { defineConfig } from "vite-plus"

export default defineConfig({
  fmt: {
    semi: false,
  },
  lint: {
    ignorePatterns: [
      ".next/**",
      "bin/**",
      "components/ui/**",
      "hooks/use-mobile.ts",
      "route-tree.gen.ts",
      "tsconfig.tsbuildinfo",
    ],
  },
  test: {
    passWithNoTests: true,
  },
})

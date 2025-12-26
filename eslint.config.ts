import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import typescript from "typescript-eslint";

export default defineConfig(
  eslint.configs.recommended,

  typescript.configs.strictTypeChecked,
  typescript.configs.stylisticTypeChecked,
  {
    languageOptions: { parserOptions: { projectService: true } },
    rules: { "@typescript-eslint/no-import-type-side-effects": "error" },
  },

  prettier,
);

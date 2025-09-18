import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import typescript from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist"] },
  eslint.configs.recommended,
  typescript.configs.strictTypeChecked,
  typescript.configs.stylisticTypeChecked,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2026,
        projectService: { allowDefaultProject: ["*.mjs"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

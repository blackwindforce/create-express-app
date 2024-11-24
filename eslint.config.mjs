import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import typescript from "typescript-eslint";

export default typescript.config(
  { ignores: ["dist"] },
  eslint.configs.recommended,
  ...typescript.configs.stylisticTypeChecked,
  prettier,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2025,
        project: ["tsconfig.json", "tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

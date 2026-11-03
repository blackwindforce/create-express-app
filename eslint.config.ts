import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig(eslint.configs.recommended, prettier);

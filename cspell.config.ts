import { defineConfig } from "cspell";

export default defineConfig({
  dictionaries: ["html"],
  files: ["**"],
  ignoreWords: ["Akira"],
  useGitignore: true,
});

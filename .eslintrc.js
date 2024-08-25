/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals", "plugin:prettier/recommended"],
  plugins: ["neverthrow", "formatjs"],
  rules: {
    "neverthrow/must-use-result": "error",
    "formatjs/no-offset": "error",
    "no-unused-vars": "off"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
};

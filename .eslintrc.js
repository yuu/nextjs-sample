module.exports = {
  extends: "next/core-web-vitals",
  plugins: ["neverthrow", "formatjs"],
  rules: {
    "neverthrow/must-use-result": "error",
    "formatjs/no-offset": "error",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
};

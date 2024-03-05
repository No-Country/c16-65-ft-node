module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // "no-console": "error",
  },
};
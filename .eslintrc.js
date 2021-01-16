module.exports = {
  root: true,
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "import"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
};

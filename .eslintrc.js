module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "prettier/prettier": "warn",
  },
};

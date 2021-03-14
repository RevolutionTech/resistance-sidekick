module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["react", "@typescript-eslint", "prettier"],
  env: {
    browser: true,
    jasmine: true,
    jest: true
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json"
  }
};

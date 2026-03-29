import coreWebVitals from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...coreWebVitals,
  {
    files: ["**/*.js", "**/*.jsx"],
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;

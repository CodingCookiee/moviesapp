import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "no-console": "off",
      "import/extensions": ["error", "ignorePackages"],
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
      "import/prefer-default-export": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          singleQuote: true,
          semi: true,
          tabWidth: 2,
        },
      ],
    },
  },
];

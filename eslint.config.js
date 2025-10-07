import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"

import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import eslintPluginImport from "eslint-plugin-import"
import eslintPluginPrettier from "eslint-plugin-prettier"
import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  js.configs.recommended,
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".jsx", ".tsx"],
        },
      ],
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]

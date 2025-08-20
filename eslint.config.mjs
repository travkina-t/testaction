import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const isCI = process.env.CI === "true";

export default [
  // Жёсткие игноры всего тяжёлого/не-JS
  { 
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      ".github/**",
      "src/**/*.{png,jpg,jpeg,gif,svg,webp}",
      "src/**/*.css"
    ]
  },

  // Базовые правила для JS/TS
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    ...pluginJs.configs.recommended,
    // На CI не подключаем prettier-плагин
    ...(isCI ? {} : eslintPluginPrettierRecommended),
    rules: {
      "no-unused-vars": "warn",
    },
  },

  // Настройки для тестов (если появятся)
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
      "jest/expect-expect": "error",
    },
  },
];
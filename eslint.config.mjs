import globals from "globals";
import pluginJs from "@eslint/js";
import plugin from "eslint-plugin-cypress/flat";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  plugin
];

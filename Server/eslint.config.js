import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [".node_modules/*"],
    languageOptions: { globals: globals.node },
    rules:{
      "no-unused-vars": "warn",
      "no-undef": "warn",
    }
  },
  
];
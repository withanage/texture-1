module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 6
  },
  "extends": "eslint:recommended",
  "globals": {
    "QUnit": true
  },
  "rules": {
    // 0 - off, 1 - warning, 2 - error
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "semi": [2, "always"],
    "comma-dangle": [2, "only-multiline"],
    "no-cond-assign": 2,
    "no-console": [2, { allow: ["warn", "info", "error", "assert"] }],
    "no-constant-condition": 2,
    "no-control-regex": 2,
    "no-debugger": 2,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty": 1,
    "no-empty-character-class": 2,
    "no-ex-assign": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": 0,
    "no-extra-semi": 2,
    "no-func-assign": 2,
    "no-inner-declarations": 2,
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-negated-in-lhs": 2,
    "no-obj-calls": 2,
    // turned of as we want to be able to use this.hasOwnProperty() for instance
    "no-prototype-builtins": 0,
    "no-regex-spaces": 2,
    "no-sparse-arrays": 0,
    "no-unexpected-multiline": 2,
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "use-isnan": 2,
    "valid-jsdoc": 0,
    "valid-typeof": 2,
    "strict": 0, // [2, "safe"],

    // Best practices
    "accessor-pairs": 0,
    "array-callback-return": 2,
    "block-scoped-var": 2,
    "complexity": [0, 10],
    "consistent-return": 0,
    "curly": [2, "multi-line"],
    "default-case": 2,
    "dot-location": [2, 'property'],
    "dot-notation": 0,
    "eqeqeq": 2,
    "guard-for-in": 2,
    "no-alert": 2,
    "no-caller": 2,
    "no-case-declarations": 2,
    "no-div-regex": 2,
    "no-else-return": 0,
    "no-empty-function": 0,
    // if you want to check for undefined or null use lodash/isNil
    "no-eq-null": 2,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-label": 2,
    "no-fallthrough": 2,
    "no-floating-decimal": 2,
    "no-implicit-coercion": 2,
    "no-implicit-globals": 2,
    "no-implied-eval": 2,
    "no-invalid-this": 2,
    "no-iterator": 2,
    "no-labels": 2,
    "no-lone-blocks": 0,
    "no-loop-func": 2,
    "no-magic-numbers": 0,
    "no-multi-spaces": 2,
    "no-multi-str": 0,
    "no-native-reassign": 2,
    "no-new": 0,
    "no-new-func": 0,
    "no-new-wrappers": 2,
    "no-octal": 2,
    "no-octal-escape": 2,
    "no-param-reassign": 0,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-return-assign": 2,
    "no-script-url": 2,
    "no-self-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-throw-literal": 2,
    "no-unmodified-loop-condition": 2,
    "no-unused-expressions": 2,
    "no-unused-labels": 2,
    "no-useless-call": 2,
    "no-useless-concat": 2,
    "no-useless-escape": 2,
    "no-void": 2,
    "no-warning-comments": 0,
    "no-with": 2,
    "radix": 2,
    "vars-on-top": 0,
    "wrap-iife": 2,
    "yoda": 0,
    // variables
    "init-declarations": 0,
    "no-catch-shadow": 2,
    "no-delete-var": 2,
    "no-label-var": 2,
    "no-restricted-globals": 2,
    "no-shadow": 0,
    "no-shadow-restricted-names": 2,
    "no-undef": 2,
    "no-undef-init": 2,
    "no-undefined": 0,
    "no-unused-vars": 2,
    "no-use-before-define": [2, { "functions": false }]
  }
};
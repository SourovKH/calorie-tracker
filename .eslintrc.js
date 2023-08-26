module.exports = {
  env: {
    es2022: true,
  },

  rules: {
    "semi": ["error", "always"],
    "eqeqeq": ["error"],
    "quotes": ["warn", "double"],
    "camelcase": ["error"],

    "no-fallthrough": ["error"],
    "no-unsafe-negation": ["error"],
    "no-unused-private-class-members": ["error"],

    "max-depth": ["warn", 3],
    "max-params": ["warn", 4],
    "complexity": ["error", 4],

    "no-duplicate-case": ["error"],
    "no-mixed-operators": ["warn"],
    "no-nested-ternary": ["error"],
    "no-param-reassign": ["error"],

    "prefer-const": ["error"],

    "no-trailing-spaces": ["warn"],
    "no-multi-spaces": ["error"],
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-unused-expressions": ["error"],
    "no-useless-return": ["error"],

    "no-undef-init": ["error"],
  },
};

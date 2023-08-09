module.exports = {
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
      ecmaVersion: 2019
  },
  rules: {
    "no-unused-vars": 2,
  },
  env: {
    es6: true,
    node: true
  }
}

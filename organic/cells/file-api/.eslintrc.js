module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 10, // 10 - 2019. Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    'no-unused-vars': 2,
  },
  env: {
    es6: true,
    node: true,
  },
}

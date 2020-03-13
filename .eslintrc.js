module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-escape': 0,
    'no-unused-vars': 0,
    // 'comma-dangle': [2, 'only-multiline'],
    'no-restricted-globals': 0,
    'import/no-unresolved': 0,
    'space-before-function-paren': 2,
    'no-undef': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  globals: {
    name: 'off',
  },
};

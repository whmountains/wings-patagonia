module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
  },
  overrides: {
    files: ['**/*.test.js'],
    env: {
      jest: true,
    },
  },
  parser: 'babel-eslint',
}

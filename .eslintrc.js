module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
  },
};

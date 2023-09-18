module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/jsx-runtime',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  rules: {
    'react-native/no-inline-styles': 0,
    'no-shadow': 'off',
  },
};

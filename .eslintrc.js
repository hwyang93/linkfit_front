module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/jsx-runtime',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    'react-native/no-inline-styles': 0,
    'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': ['error'],
  },
};

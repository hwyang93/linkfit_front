module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@api': './src/api',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@navigations': './src/navigations',
          '@screen': './src/screen',
          '@slices': './src/slices',
          '@store': './src/store',
          '@images': './src/assets/images',
          '@styles': './src/styles/',
          '@util': './src/utils/',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

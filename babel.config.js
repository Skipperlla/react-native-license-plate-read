module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanOCR'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@types': './src/@types',
          '@assets': './src/assets',
          '@components': './src/components',
          '@layout': './src/layout',
          '@lang': './src/lang',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@store': './src/store',
          '@utils': './src/utils',
          '@features': './src/features',
          '@new_store': './src/new-store',
        },
      },
    ],
  ],
};

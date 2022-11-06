module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@dotenv',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
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
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@config': './src/config',
        },
      },
    ],
  ],
};

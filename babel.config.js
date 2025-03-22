module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 1. Keep react-native-reanimated/plugin as a standalone entry
    'react-native-reanimated/plugin',

    // 2. Configure module-resolver separately
    [
      'module-resolver',
      {
        root: ['./'], // or './src' for a /src folder
        alias: {
          '@': './', // or '@': './src' if using /src
        },
      },
    ],
  ],
};

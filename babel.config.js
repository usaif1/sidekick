module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'], // or './src' if you keep code in a /src folder
        alias: {
          '@': './', // or './src' (see next section for details)
        },
      },
    ],
  ],
};

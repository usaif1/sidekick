module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
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

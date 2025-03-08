import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'SideKick App', 
})
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/, 
    },
    editor: false,
    errors: true, 
    overlay: false, 
    log: true,
  })
  .connect();

console.tron = Reactotron;

Reactotron.clear();

console.tron.log('Reactotron Configured!');
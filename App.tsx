import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AppNavigator from './navigator';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <PaperProvider>
        <AppNavigator />
        <Toast />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;

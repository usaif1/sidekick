import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { PaperProvider } from 'react-native-paper';
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
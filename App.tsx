import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';

// misc
import './ReactotronConfig';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <ProtectedNavigation />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;

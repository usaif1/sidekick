// dependencies
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';

// misc
import './ReactotronConfig';

function App(): React.JSX.Element {
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <AuthNavigation /> */}
        <ProtectedNavigation />
      </GestureHandlerRootView>
    </>
  );
}

export default App;

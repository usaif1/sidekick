// dependencies
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';

// misc
import './ReactotronConfig';
import {useGlobalStore} from './globalStore';

function App(): React.JSX.Element {
  const {firsTime} = useGlobalStore();

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        {firsTime ? <SplashNavigation /> : <ProtectedNavigation />}
      </GestureHandlerRootView>
    </>
  );
}

export default App;

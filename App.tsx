import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';
import AuthNavigation from '@/modules/authentication/navigation/auth.navigation';

// misc
// import './ReactotronConfig';
import {useGlobalStore} from './globalStore';

function App(): React.JSX.Element {
  const {firsTime, loggedIn} = useGlobalStore();

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        {firsTime ? (
          <SplashNavigation />
        ) : loggedIn ? (
          <ProtectedNavigation />
        ) : (
          <AuthNavigation />
        )}
      </GestureHandlerRootView>
    </>
  );
}

export default App;

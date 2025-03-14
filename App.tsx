// dependencies
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

// components
import {ModalProvider} from '@/components/Modal/ModalProvider';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';
import AuthNavigation from '@/modules/authentication/navigation/auth.navigation';

// misc
import './ReactotronConfig';
import {useGlobalStore} from './globalStore';

function App(): React.JSX.Element {
  const {firsTime, loggedIn} = useGlobalStore();

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        {firsTime ? (
          <SplashNavigation />
        ) : loggedIn ? (
          <ModalProvider>
            <ProtectedNavigation />
          </ModalProvider>
        ) : (
          <AuthNavigation />
        )}
      </GestureHandlerRootView>
    </>
  );
}

export default App;

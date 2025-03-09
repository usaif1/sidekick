import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ModalProvider } from '@/components/Modal/ModalProvider';
import AppNavigator from '@/navigation';

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
        {firsTime ? (
          <SplashNavigation />
        ) : loggedIn ? (
          <ProtectedNavigation />
        ) : (
          <AuthNavigation />
        )}
      </GestureHandlerRootView>
    </>
    // <SafeAreaProvider>
    //     <NavigationContainer>
    //   <ModalProvider>
    //       <GestureHandlerRootView style={{flex: 1}}>
    //         {firsTime ? <SplashNavigation /> : <ProtectedNavigation />}
    //       </GestureHandlerRootView>
    //   </ModalProvider>
    //     </NavigationContainer>
    // </SafeAreaProvider>
  );
}

export default App;

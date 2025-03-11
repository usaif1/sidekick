import React, { useEffect } from 'react';
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
import requestLocationPermission from './components/LocationPermission';
import Geolocation from '@react-native-community/geolocation';

function App(): React.JSX.Element {
  const {firsTime, loggedIn} = useGlobalStore();

  useEffect(() => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        if (position.mocked) {
          console.log('Location is mocked');
        } else {
          console.log('Location is genuine');
        }
      },
      (error) => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        {firsTime ? (
          <SplashNavigation />
        ) : loggedIn ? (
          <ModalProvider>
          <ProtectedNavigation /></ModalProvider>
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

// dependencies
import React, { useEffect } from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import { PortalProvider } from '@gorhom/portal';
// components
import {ModalProvider} from '@/components/Modal/ModalProvider';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';
import AuthNavigation from '@/modules/authentication/navigation/auth.navigation';

// misc
import './ReactotronConfig';
import {useGlobalStore} from './globalStore';
import GlobalModal from './components/GlobalModal';
import requestLocationPermission from './components/LocationPermission';
import Geolocation from '@react-native-community/geolocation';

function App(): React.JSX.Element {
  const {firsTime, loggedIn} = useGlobalStore();

  useEffect(() => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        console.log('Location:', position);
      },
      error => {
        console.log('Error getting location:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        {firsTime ? (
          <SplashNavigation />
        ) : loggedIn ? (
          <PortalProvider>
          <ModalProvider>
            <ProtectedNavigation />
          </ModalProvider>
          </PortalProvider>
        ) : (
          <PortalProvider>
          <AuthNavigation /></PortalProvider>
        )}
        <GlobalModal />
      </GestureHandlerRootView>
    </>
  );
}

export default App;

// dependencies
import React, {useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Provider, Client} from 'urql';
import axios from 'axios';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';
import AuthNavigation from '@/modules/authentication/navigation/auth.navigation';

// components
import {SplashPrimary} from './modules/splash/screens';
import {ToastMessage} from '@/components';

// misc
import './ReactotronConfig';
import {useAuthStore, useGlobalStore} from './globalStore';

function App(): React.JSX.Element {
  const {setAuthBottomSheetRef, authLoaders, graphQLClient} = useAuthStore();

  const {
    setGlobalBottomSheetRef,
    GlobalBottomSheetComponent,
    globalBottomSheetSnapPoints,
    onboarded,
  } = useGlobalStore();

  const authBottomSheetRef = useRef<BottomSheet>(null);
  const globalBottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    axios.get('https://sidekick-backend-279t.onrender.com');

    setAuthBottomSheetRef(authBottomSheetRef);
    setGlobalBottomSheetRef(globalBottomSheetRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!onboarded) {
    return (
      <>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent
        />
        <SplashNavigation />
        <ToastMessage />
      </>
    );
  }

  if (authLoaders['loading-user']) {
    return (
      <>
        <SplashPrimary />
        <ToastMessage />
      </>
    );
  }

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent
        />
        {graphQLClient ? (
          <Provider value={graphQLClient as Client}>
            <ProtectedNavigation />
            <BottomSheet
              key="protectedBottomSheet"
              ref={globalBottomSheetRef}
              handleComponent={() => null}
              backgroundStyle={{backgroundColor: 'transparent'}}
              enablePanDownToClose={false}
              enableDynamicSizing={false}
              index={-1}
              snapPoints={globalBottomSheetSnapPoints}>
              <BottomSheetView>
                {GlobalBottomSheetComponent && <GlobalBottomSheetComponent />}
              </BottomSheetView>
            </BottomSheet>
            <ToastMessage />
          </Provider>
        ) : (
          <>
            <AuthNavigation />
            <ToastMessage />
          </>
        )}
      </GestureHandlerRootView>
    </>
  );
}

export default App;
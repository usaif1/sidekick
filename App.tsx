// dependencies
import React, {useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Provider, Client} from 'urql';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';
import AuthNavigation from '@/modules/authentication/navigation/auth.navigation';

// components
import {SplashPrimary} from './modules/splash/screens';

// misc
import './ReactotronConfig';
import {useAuthStore, useGlobalStore} from './globalStore';

function App(): React.JSX.Element {
  const {
    setAuthBottomSheetRef,
    AuthBottomSheetComponent,
    authBottomSheetSnapPoints,
    authLoaders,
    graphQLClient,
  } = useAuthStore();

  const {
    setGlobalBottomSheetRef,
    GlobalBottomSheetComponent,
    globalBottomSheetSnapPoints,
    onboarded,
  } = useGlobalStore();

  const authBottomSheetRef = useRef<BottomSheet>(null);
  const globalBottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setAuthBottomSheetRef(authBottomSheetRef);
    setGlobalBottomSheetRef(globalBottomSheetRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!onboarded) {
    return <SplashNavigation />;
  }

  if (authLoaders['loading-user']) {
    return <SplashPrimary />;
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
          </Provider>
        ) : (
          <>
            <AuthNavigation />
            <BottomSheet
              key="authBottomSheet"
              ref={authBottomSheetRef}
              enablePanDownToClose={false}
              enableOverDrag={false}
              enableHandlePanningGesture={false}
              handleComponent={() => null}
              style={{flex: 1}}
              keyboardBehavior="interactive"
              enableContentPanningGesture={false}
              android_keyboardInputMode="adjustResize"
              keyboardBlurBehavior="restore"
              index={1}
              snapPoints={authBottomSheetSnapPoints}>
              <BottomSheetView>
                {AuthBottomSheetComponent && <AuthBottomSheetComponent />}
              </BottomSheetView>
            </BottomSheet>
          </>
        )}
      </GestureHandlerRootView>
    </>
  );
}

export default App;

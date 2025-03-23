// dependencies
import React, {useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';
import AuthNavigation from '@/modules/authentication/navigation/auth.navigation';

// misc
import './ReactotronConfig';
import {useAuthStore, useGlobalStore} from './globalStore';

// storage
import {splashStorage} from '@/globalStorage';

function App(): React.JSX.Element {
  const {loggedIn} = useGlobalStore();

  const onboarded = splashStorage.getBoolean('onboarding_complete');

  const {
    setAuthBottomSheetRef,
    AuthBottomSheetComponent,
    authBottomSheetSnapPoints,
  } = useAuthStore();

  const {
    setGlobalBottomSheetRef,
    GlobalBottomSheetComponent,
    globalBottomSheetSnapPoints,
  } = useGlobalStore();

  const authBottomSheetRef = useRef<BottomSheet>(null);
  const globalBottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setAuthBottomSheetRef(authBottomSheetRef);
    setGlobalBottomSheetRef(globalBottomSheetRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent
        />
        {onboarded ? (
          loggedIn ? (
            <>
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
            </>
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
          )
        ) : (
          <SplashNavigation />
        )}
      </GestureHandlerRootView>
    </>
  );
}

export default App;

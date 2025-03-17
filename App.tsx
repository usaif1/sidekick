// dependencies
import React, {useEffect, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

// components
import {ModalProvider} from '@/components/Modal/ModalProvider';

// navigation
import ProtectedNavigation from './navigation/ProtectedNavigation';
import SplashNavigation from '@/modules/splash/navigation/splash.navigation';
import AuthNavigation from '@/modules/authentication/navigation/auth.navigation';

// misc
import './ReactotronConfig';
import {useAuthStore, useGlobalStore} from './globalStore';
import GlobalModal from './components/GlobalModal';

function App(): React.JSX.Element {
  const {firsTime, loggedIn} = useGlobalStore();

  const {
    setAuthBottomSheetRef,
    AuthBottomSheetComponent,
    authBottomSheetSnapPoints,
  } = useAuthStore();

  const authBottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setAuthBottomSheetRef(authBottomSheetRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <>
            <AuthNavigation />
            <BottomSheet
              ref={authBottomSheetRef}
              enablePanDownToClose={false}
              enableOverDrag={false}
              enableHandlePanningGesture={false}
              handleComponent={() => null}
              style={{flex: 1}}
              keyboardBehavior="interactive"
              enableContentPanningGesture={false}
              android_keyboardInputMode="adjustPan"
              keyboardBlurBehavior="restore"
              index={1}
              snapPoints={authBottomSheetSnapPoints}>
              <BottomSheetView>
                {AuthBottomSheetComponent && <AuthBottomSheetComponent />}
              </BottomSheetView>
            </BottomSheet>
          </>
        )}
        <GlobalModal />
      </GestureHandlerRootView>
    </>
  );
}

export default App;

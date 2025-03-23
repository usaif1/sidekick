// dependencies
import React, {useEffect} from 'react';
import {ImageBackground, Dimensions, View, Pressable} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// components
import ChevronLeft from '@/assets/chevron-left.svg';

// store
import {useAuthStore} from '@/globalStore';

// utils
import {authUtils} from '../utils';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const AuthScreen: React.FC = () => {
  const {currentView, openAuthBottomSheet} = useAuthStore();
  const {setBottomSheetView} = authUtils;

  const onPressBackButton = () => {
    

    switch (currentView) {
      case 'otpNew':
        setBottomSheetView('new');
        return;

      case 'otpEmployee':
        setBottomSheetView('employee');
        return;

      case 'otpExisting':
        setBottomSheetView('existing');
        return;

      default:
        setBottomSheetView('welcome');
        return;
    }
  };

  useEffect(() => {
    openAuthBottomSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/Map.png')} // Path to your background image
        style={[styles.background, {width, height}]} // Set width and height dynamically
      />
      {currentView !== 'welcome' ? (
        <Pressable
          onPress={onPressBackButton}
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            zIndex: 99,
            height: 48,
            width: 48,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            backgroundColor: 'white',
          }}>
          <ChevronLeft />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
});

export default AuthScreen;

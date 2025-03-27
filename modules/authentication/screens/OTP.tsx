// dependencies
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {ScaledSheet} from 'react-native-size-matters';
import {useHeaderHeight} from '@react-navigation/elements';

// components
import {
  BottomSheetStyledInput,
  ButtonText,
  Divider,
  showToast,
} from '@/components';

// store
import {useThemeStore, useAuthStore} from '@/globalStore';

// services
import AuthService from '../services/auth.service';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const OTPForm: React.FC = () => {
  const {theme} = useThemeStore();
  const headerHeight = useHeaderHeight();
  const {
    confirmationResult,
    setAuthUser,
    startLoading,
    stopLoading,
    authLoaders,
  } = useAuthStore();
  const authBottomSheetRef = useRef<BottomSheet>(null);

  const [otp, setOTP] = useState<string>('');

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      showToast({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter a valid otp.',
        position: 'top',
      });
      return;
    }
    Keyboard.dismiss();
    try {
      startLoading('otp-verification');
      authBottomSheetRef?.current?.snapToPosition('41%');
      const response = await AuthService.verifyOTP(
        confirmationResult,
        otp,
        () => {},
      );

      setAuthUser(response);

      return response;
    } catch (err) {
      stopLoading('otp-verification');
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'Incorrect OTP. Please try again.',
        position: 'top',
      });
    }
  };

  const onFocus = () => {
    authBottomSheetRef?.current?.snapToPosition('70%');
  };

  const onSubmitEditing = () => {
    Keyboard.dismiss();
    authBottomSheetRef?.current?.snapToPosition('41%');
  };

  const getSnapPoints = () => {
    if (Platform.OS === 'android') {
      return ['40%', '41%', '70%'];
    } else {
      return ['40%'];
    }
  };

  useEffect(() => {
    stopLoading('auth-confirmation');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/Map.png')} // Path to your background image
          style={[styles.background, {width, height}]} // Set width and height dynamically
        />
      </View>
      <BottomSheet
        key="authBottomSheet"
        ref={authBottomSheetRef}
        topInset={headerHeight}
        enablePanDownToClose={false}
        enableOverDrag={false}
        enableHandlePanningGesture={false}
        handleComponent={() => null}
        keyboardBehavior="interactive"
        enableContentPanningGesture={false}
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        index={1}
        snapPoints={getSnapPoints()}>
        <BottomSheetView>
          <View style={styles.contentContainer}>
            <View style={{width: '100%'}}>
              <Text style={styles.label}>Please Enter the OTP Received</Text>
              <Divider height={10} />
              {Platform.OS === 'android' ? (
                <BottomSheetStyledInput
                  placeholder="XXXX"
                  maxLength={6}
                  onFocus={onFocus}
                  onSubmitEditing={onSubmitEditing}
                  value={otp}
                  onChangeText={text => {
                    setOTP(text);
                  }}
                  inputMode="numeric"
                  customStyle={{
                    textAlign: 'center',
                    paddingLeft: 0,
                  }}
                />
              ) : (
                <BottomSheetStyledInput
                  placeholder="XXXX"
                  value={otp}
                  inputMode="numeric"
                  onChangeText={text => {
                    setOTP(text);
                  }}
                  customStyle={{
                    textAlign: 'center',
                    paddingLeft: 0,
                  }}
                />
              )}
            </View>

            <Pressable
              style={{
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: theme.colors.highlight,
                  fontSize: 10,
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                  marginTop: 12,
                }}>
                Resend OTP
              </Text>
            </Pressable>

            <View
              style={{
                marginTop: 20,
                width: 220,
                alignSelf: 'center',
              }}>
              <ButtonText
                variant="primary"
                onPress={verifyOTP}
                loading={authLoaders['otp-verification']}>
                Continue
              </ButtonText>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default OTPForm;

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
  contentContainer: {
    rowGap: 16,
    width: '100%',
    backgroundColor: 'white', // Optional: Adds a dark overlay for text readability
    borderRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

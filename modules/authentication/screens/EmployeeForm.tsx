// dependencies
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
  TouchableHighlight,
} from '@gorhom/bottom-sheet';
import {useHeaderHeight} from '@react-navigation/elements';

// components
import {ButtonText, Divider, LabelPrimary} from '@/components';
import DropdownIcon from '@/modules/home/assets/dropdownIcon.svg';

// store
import {useAuthStore, useThemeStore} from '@/globalStore';

// services
import {AuthService} from '@/globalService';
import {authUtils} from '../utils';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const EmployeeForm: React.FC = () => {
  const headerHeight = useHeaderHeight();

  const {theme} = useThemeStore();
  const authBottomSheetRef = useRef<BottomSheet>(null);

  const {existingUserPhoneNumber, setExistingUserPhoneNumber} = useAuthStore();

  const onFocus = () => {
    authBottomSheetRef?.current?.snapToPosition('100%');
  };

  const onSubmitEditing = () => {
    Keyboard.dismiss();
    if (Platform.OS === 'android') {
      authBottomSheetRef?.current?.snapToPosition('60%');
    }
  };

  const continueHandler = async () => {
    try {
      const response = await AuthService.sendOTP(
        `+91${existingUserPhoneNumber}`,
        false,
      );
      if (response) {
        authUtils.setBottomSheetView('otpExisting');
      }
    } catch (err) {
      console.log('Error sending otp', err);
    }
  };

  const getSnapPoints = () => {
    if (Platform.OS === 'android') {
      return ['60%', '100%'];
    } else {
      return ['60%'];
    }
  };

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
        topInset={headerHeight}
        ref={authBottomSheetRef}
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
        <BottomSheetView style={styles.contentContainer}>
          <View style={{width: '100%'}}>
            <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
              Select Institution
            </LabelPrimary>
            <Divider height={10} />
            <TouchableHighlight
              style={{
                justifyContent: 'center',
                borderWidth: 2,
                width: '100%',
                height: verticalScale(48),
                borderColor: theme.colors.textSecondary,
                borderRadius: 20,
                paddingHorizontal: scale(18),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: moderateScale(15.2),
                    fontWeight: '600',
                  }}>
                  XXXXXXXXXX
                </Text>
                <DropdownIcon />
              </View>
            </TouchableHighlight>
          </View>

          <View style={{width: '100%'}}>
            <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
              Enter Employee ID
            </LabelPrimary>
            <Divider height={10} />
            {Platform.OS === 'android' ? (
              <BottomSheetTextInput
                placeholder="XXXXXXXXXX"
                onSubmitEditing={onSubmitEditing}
                onFocus={onFocus}
                placeholderTextColor={theme.colors.textSecondary}
                style={{
                  borderWidth: 2,
                  width: '100%',
                  height: verticalScale(48),
                  borderColor: theme.colors.textSecondary,
                  borderRadius: 20,
                  paddingLeft: scale(18),
                  fontWeight: '600',
                  fontSize: moderateScale(15.2),
                  color: theme.colors.textPrimary,
                }}
              />
            ) : (
              <BottomSheetTextInput
                placeholder="XXXXXXXXXX"
                placeholderTextColor={theme.colors.textSecondary}
                style={{
                  borderWidth: 2,
                  width: '100%',
                  height: verticalScale(48),
                  borderColor: theme.colors.textSecondary,
                  borderRadius: 20,
                  paddingLeft: scale(18),
                  fontWeight: '600',
                  fontSize: moderateScale(15.2),
                  color: theme.colors.textPrimary,
                }}
              />
            )}
          </View>

          <View style={{width: '100%'}}>
            <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
              Enter Your Phone Number
            </LabelPrimary>
            <Divider height={10} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                width: '100%',
                height: verticalScale(48),
                borderColor: theme.colors.textSecondary,
                borderRadius: 20,
                paddingLeft: scale(18),
                columnGap: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: theme.colors.highlight,
                    fontSize: 16,
                    fontFamily: 'PlusJakartaSans-Bold',
                  }}>
                  +91{' '}
                </Text>
                <View
                  style={{width: 1, height: 20, backgroundColor: 'black'}}
                />
              </View>
              {Platform.OS === 'android' ? (
                <BottomSheetTextInput
                  onSubmitEditing={onSubmitEditing}
                  onFocus={onFocus}
                  keyboardType="numeric"
                  placeholder="XXXXXXXXXX"
                  onChangeText={setExistingUserPhoneNumber}
                  placeholderTextColor={theme.colors.textSecondary}
                  style={{
                    color: theme.colors.textPrimary,
                    width: '70%',
                    fontWeight: '600',
                    paddingVertical: 0,
                    fontSize: moderateScale(15.2),
                  }}
                />
              ) : (
                <BottomSheetTextInput
                  keyboardType="numeric"
                  placeholder="XXXXXXXXXX"
                  onChangeText={setExistingUserPhoneNumber}
                  placeholderTextColor={theme.colors.textSecondary}
                  style={{
                    color: theme.colors.textPrimary,
                    width: '70%',
                    fontWeight: '600',
                    paddingVertical: 0,
                    fontSize: moderateScale(15.2),
                  }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              marginTop: 4,
              width: 220,
              alignSelf: 'center',
            }}>
            <ButtonText variant="primary" onPress={continueHandler}>
              Continue
            </ButtonText>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default EmployeeForm;

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
  contentContainer: {
    height: 200,
    rowGap: 16,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
    zIndex: 99,
  },
});

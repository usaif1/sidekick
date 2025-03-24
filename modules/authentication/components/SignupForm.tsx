// dependencies
import {Text, View} from 'react-native';
import React from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';

// components
import {
  BottomSheetStyledInput,
  ButtonText,
  Divider,
  LabelPrimary,
} from '@/components';

// services
import AuthService from '../services/auth.service.ts';

// store
import {useAuthStore, useThemeStore} from '@/globalStore';
import {authUtils} from '../utils';

const SignupForm: React.FC = () => {
  const {theme} = useThemeStore();

  const {newUserFormData, setNewUserFormData} = useAuthStore();

  const onChangeText = (fieldName: string, text: string) => {
    setNewUserFormData(fieldName, text);
  };

  const continueHandler = async () => {
    try {
      const response = await AuthService.sendOTP(
        `+91${newUserFormData.phoneNumber}`,
        false,
      );
      if (response) {
        authUtils.setBottomSheetView('otpNew');
      }
    } catch (err) {
      console.log('Error sending otp', err);
    }
  };

  return (
    <BottomSheetView style={styles.contentContainer}>
      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Enter your Full Name
        </LabelPrimary>
        <Divider height={10} />
        <BottomSheetStyledInput
          placeholder="XXXXXXXXXX"
          numberOfLines={1}
          value={newUserFormData.fullName}
          onChangeText={text => {
            onChangeText('fullName', text);
          }}
        />
      </View>
      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Enter Email ID
          <LabelPrimary
            labelColor="textSecondary"
            customStyles={{fontStyle: 'italic'}}>
            {' '}
            (optional)
          </LabelPrimary>
        </LabelPrimary>
        <Divider height={10} />
        <BottomSheetStyledInput
          placeholder="XXXXXXXXXX"
          value={newUserFormData.email}
          autoCapitalize="none"
          onChangeText={text => {
            onChangeText('email', text);
          }}
          keyboardType="email-address"
        />
      </View>

      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Enter Your Phone Number
        </LabelPrimary>
        <Divider height={10} />
        <View
          style={[
            styles.containerStyles,
            {borderColor: theme.colors.textSecondary},
          ]}>
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
            <View style={{width: 1, height: 20, backgroundColor: 'black'}} />
          </View>
          <BottomSheetTextInput
            placeholder="XXXXXXXXXX"
            placeholderTextColor={theme.colors.textSecondary}
            value={newUserFormData.phoneNumber}
            onChangeText={text => {
              onChangeText('phoneNumber', text);
            }}
            style={{
              fontWeight: '600',
              paddingVertical: 0,
              fontSize: moderateScale(15.2),
            }}
          />
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
  );
};

export default SignupForm;

const styles = ScaledSheet.create({
  contentContainer: {
    rowGap: 16,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  containerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    width: '100%',
    height: verticalScale(48),

    borderRadius: 20,
    paddingLeft: scale(18),
    columnGap: 10,
  },
});

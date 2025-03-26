// dependencies
import {Text, View, TouchableWithoutFeedback} from 'react-native';
import React, {useRef, useState} from 'react';
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

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phoneNumber?: string;
  }>({});

  const {newUserFormData, setNewUserFormData} = useAuthStore();

  const onChangeText = (fieldName: string, text: string) => {
    setNewUserFormData(fieldName, text);
  };

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      phoneNumber?: string;
    } = {};
    let isValid = true;

    // Validate full name
    if (!newUserFormData.fullName || newUserFormData.fullName.trim() === '') {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Validate email (optional but must be valid if provided)
    if (
      newUserFormData.email &&
      newUserFormData.email.trim() !== '' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserFormData.email)
    ) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate phone number
    if (!newUserFormData.phoneNumber || newUserFormData.phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (newUserFormData.phoneNumber.length !== 10 || !/^\d+$/.test(newUserFormData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const continueHandler = async () => {
    if (!validateForm()) {
      return;
    }

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

  const phoneInputRef = useRef<React.ElementRef<typeof BottomSheetTextInput>>(null);

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
        {errors.fullName ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errors.fullName}
          </Text>
        ) : null}
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
        {errors.email ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errors.email}
          </Text>
        ) : null}
      </View>

      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Enter Your Phone Number
        </LabelPrimary>
        <Divider height={10} />
        <TouchableWithoutFeedback onPress={() => phoneInputRef.current?.focus()}>
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
              ref={phoneInputRef}
              placeholder="XXXXXXXXXX"
              keyboardType="numeric"
              maxLength={10}
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
        </TouchableWithoutFeedback>
        {errors.phoneNumber ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errors.phoneNumber}
          </Text>
        ) : null}
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
  errorText: {
    fontSize: '12@ms',
    marginTop: '4@vs',
    marginLeft: '18@s',
  },
});

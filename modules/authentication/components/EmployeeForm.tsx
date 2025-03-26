// dependencies
import {Text, View, Pressable, TouchableWithoutFeedback} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';
import DropdownIcon from '@/modules/home/assets/dropdownIcon.svg';

// components
import {
  BottomSheetStyledInput,
  ButtonText,
  Divider,
  LabelPrimary,
} from '@/components';

// store
import {useThemeStore} from '@/globalStore';
import {authUtils} from '../utils';

const EmployeeForm: React.FC = () => {
  const {theme} = useThemeStore();
  const inputRef = useRef<React.ElementRef<typeof BottomSheetTextInput>>(null);
  const [institution, setInstitution] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState<{
    institution?: string;
    employeeId?: string;
    phoneNumber?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      institution?: string;
      employeeId?: string;
      phoneNumber?: string;
    } = {};
    let isValid = true;

    // Validate institution
    if (!institution || institution.trim() === '') {
      newErrors.institution = 'Institution is required';
      isValid = false;
    }

    // Validate employee ID
    if (!employeeId || employeeId.trim() === '') {
      newErrors.employeeId = 'Employee ID is required';
      isValid = false;
    }

    // Validate phone number
    if (!phoneNumber || phoneNumber.trim() === '') {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const continueHandler = () => {
    if (!validateForm()) {
      return;
    }
    authUtils.setBottomSheetView('otpEmployee');
  };

  return (
    <BottomSheetView style={styles.contentContainer}>
      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Select Institution
        </LabelPrimary>
        <Divider height={10} />
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 2,
            width: '100%',
            height: verticalScale(48),
            borderColor: theme.colors.textSecondary,
            borderRadius: 20,
            paddingHorizontal: scale(18),
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
        </Pressable>
        {errors.institution ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errors.institution}
          </Text>
        ) : null}
      </View>

      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Enter Employee ID
        </LabelPrimary>
        <Divider height={10} />
        <BottomSheetStyledInput 
          placeholder="XXXXXXXXXX" 
          value={employeeId}
          onChangeText={setEmployeeId}
        />
        {errors.employeeId ? (
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {errors.employeeId}
          </Text>
        ) : null}
      </View>

      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Enter Your Phone Number
        </LabelPrimary>
        <Divider height={10} />
        <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
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
              <View style={{width: 1, height: 20, backgroundColor: 'black'}} />
            </View>
            <BottomSheetTextInput
              ref={inputRef}
              keyboardType="numeric"
              placeholder="XXXXXXXXXX"
              placeholderTextColor={theme.colors.textSecondary}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={10}
              style={{
                color: theme.colors.textPrimary,
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
        <ButtonText
          variant="primary"
          onPress={continueHandler}>
          Continue
        </ButtonText>
      </View>
    </BottomSheetView>
  );
};

export default EmployeeForm;

const styles = ScaledSheet.create({
  contentContainer: {
    rowGap: 16,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: '12@ms',
    marginTop: '4@vs',
    marginLeft: '18@s',
  },
});

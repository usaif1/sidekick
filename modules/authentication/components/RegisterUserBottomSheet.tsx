import React, { forwardRef, useCallback, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View, Text, TextInput, Dimensions, LayoutAnimation } from 'react-native';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Portal } from '@gorhom/portal';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

// Components
import BaseBottomSheet, { BottomSheetContent } from '@/components/atoms/bottomsheet/Bottomsheet';
import { Divider, LabelPrimary, ButtonText } from '@/components';
import { useThemeStore } from '@/globalStore';

interface RegisterUserBottomSheetProps {
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const RegisterUserBottomSheet = forwardRef<BottomSheet, RegisterUserBottomSheetProps>(
  ({ onClose }, ref) => {
    const { theme } = useThemeStore();
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigation = useNavigation();

    // Add animation for smooth transition
    const handleFocus = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsInputFocused(true);
    };

    const handleBlur = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsInputFocused(false);
    };

    const handleContinue = useCallback(() => {
      // Navigate to OTP screen or handle registration
      // @ts-ignore
      navigation.navigate('otp');
      if (ref && 'current' in ref && ref.current) {
        ref.current.close();
      }
    }, [navigation, ref]);

    return (
      <Portal>
        <BaseBottomSheet
          ref={ref}
          headerTitle="Create Account"
          snapPoints={['75%']}
          enablePanDownToClose
          onClose={onClose}
          keyboardBehavior="extend"
        >
          <BottomSheetContent 
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
                  Enter your Full Name
                </LabelPrimary>
                <Divider height={10} />
                <View style={[styles.textInputContainer, { borderColor: theme.colors.textSecondary }]}>
                  <BottomSheetTextInput
                    placeholder="John Doe"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={styles.textInput}
                    placeholderTextColor={theme.colors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
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
                <View style={[styles.textInputContainer, { borderColor: theme.colors.textSecondary }]}>
                  <BottomSheetTextInput
                    placeholder="example@email.com"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={styles.textInput}
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
                  Enter Your Phone Number
                </LabelPrimary>
                <Divider height={10} />
                <View
                  style={[
                    styles.phoneInputContainer,
                    { borderColor: theme.colors.textSecondary }
                  ]}>
                  <View style={styles.countryCodeContainer}>
                    <Text
                      style={[
                        styles.countryCode,
                        { color: theme.colors.highlight }
                      ]}>
                      +91{' '}
                    </Text>
                    <View style={[styles.divider, { backgroundColor: theme.colors.textPrimary }]} />
                  </View>
                  <BottomSheetTextInput
                    placeholder="XXXXXXXXXX"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholderTextColor={theme.colors.textSecondary}
                    style={styles.phoneInput}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <ButtonText
                  variant="primary"
                  onPress={handleContinue}>
                  Continue
                </ButtonText>
              </View>
            </View>
          </BottomSheetContent>
        </BaseBottomSheet>
      </Portal>
    );
  }
);

const styles = ScaledSheet.create({
  contentContainer: {
    paddingHorizontal: '24@s',
    paddingBottom: '24@vs',
  },
  formContainer: {
    width: '100%',
    rowGap: '16@vs',
  },
  inputContainer: {
    width: '100%',
    marginBottom: '8@vs',
  },
  textInputContainer: {
    borderWidth: 2,
    borderRadius: 20,
    height: '48@vs',
    paddingHorizontal: '18@s',
    justifyContent: 'center',
  },
  textInput: {
    fontWeight: '600',
    paddingVertical: 0,
    fontSize: '15.2@ms',
    height: '40@vs',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    width: '100%',
    height: '48@vs',
    borderRadius: 20,
    paddingLeft: '18@s',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  divider: {
    width: 1,
    height: 20,
  },
  phoneInput: {
    flex: 1,
    fontWeight: '600',
    paddingVertical: 0,
    fontSize: '15.2@ms',
    marginLeft: '10@s',
  },
  buttonContainer: {
    marginTop: '20@vs',
    width: 220,
    alignSelf: 'center',
  },
});

export default RegisterUserBottomSheet; 
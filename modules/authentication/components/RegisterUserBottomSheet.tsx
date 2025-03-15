import React, { forwardRef, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View, Dimensions } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Portal } from '@gorhom/portal';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Components
import BaseBottomSheet, { BottomSheetContent } from '@/components/atoms/bottomsheet/Bottomsheet';
import { Divider, ButtonText } from '@/components';
import { useThemeStore } from '@/globalStore';
import CustomBottomFormInput from '@/components/Input/CustomBottomFormInput';

// Define validation schema with Zod
const registerSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Invalid email address' }).optional().or(z.literal('')),
  phoneNumber: z.string().length(10, { message: 'Phone number must be 10 digits' }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterUserBottomSheetProps {
  onClose: () => void;
}

const { width } = Dimensions.get('window');

const RegisterUserBottomSheet = forwardRef<BottomSheet, RegisterUserBottomSheetProps>(
  ({ onClose }, ref) => {
    const { colors } = useThemeStore(state => state.theme);
    const navigation = useNavigation();

    // Initialize form with React Hook Form + Zod
    const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        fullName: '',
        email: '',
        phoneNumber: '',
      },
    });

    const handleContinue = useCallback((data: RegisterFormData) => {
      // Navigate to OTP screen or handle registration
      console.log('Form data:', data);
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
              <CustomBottomFormInput
                name="fullName"
                label="Enter your Full Name"
                control={control}
                errors={errors}
                placeholder="John Doe"
                required={true}
                containerStyle={styles.inputContainer}
              />

              <CustomBottomFormInput
                name="email"
                label="Enter Email ID (optional)"
                control={control}
                errors={errors}
                placeholder="example@email.com"
                inputType="email"
                containerStyle={styles.inputContainer}
              />

              <CustomBottomFormInput
                name="phoneNumber"
                label="Enter Your Phone Number"
                control={control}
                errors={errors}
                placeholder="XXXXXXXXXX"
                required={true}
                variant="phone"
                countryCode="+91"
                inputType="numeric"
                maxLength={10}
                containerStyle={styles.inputContainer}
              />

              <View style={styles.buttonContainer}>
                <ButtonText
                  variant="primary"
                  onPress={handleSubmit(handleContinue)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue'}
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
  buttonContainer: {
    marginTop: '20@vs',
    width: 220,
    alignSelf: 'center',
  },
});

export default RegisterUserBottomSheet; 
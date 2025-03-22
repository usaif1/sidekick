// dependencies
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, ImageBackground, Dimensions, TextInput} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

// store
import {useThemeStore} from '@/globalStore';
import {ButtonText, CommonTextInput, Divider, LabelPrimary} from '@/components';
import {sendOTP} from '../services/auth.service';

// ... other imports remain the same

const {theme} = useThemeStore.getState();
const {width, height} = Dimensions.get('window'); // Get screen dimensions

// Validation Schema
const signupSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits')
    .regex(/^\d+$/, 'Must contain only numbers'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const continueHandler = async (data: SignupFormData) => {
    try {
      await sendOTP(`+91${data.phoneNumber}`, false);
      navigation.navigate('otp');
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Map.png')}
      style={[styles.background, {width, height}]}>
      <View style={styles.contentContainer}>
        {/* Full Name Input */}
        <View style={{width: '100%'}}>
          <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
            Enter your Full Name
          </LabelPrimary>
          <Divider height={10} />
          <Controller
            control={control}
            name="fullName"
            render={({field: {onChange, onBlur, value}}) => (
              <CommonTextInput
                placeholder="XXXXXXXXXX"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}
        </View>

        {/* Email Input */}
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
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <CommonTextInput
                placeholder="XXXXXXXXXX"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        {/* Phone Number Input */}
        <View style={{width: '100%'}}>
          <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
            Enter Your Phone Number
          </LabelPrimary>
          <Divider height={10} />
          <Controller
            control={control}
            name="phoneNumber"
            render={({field: {onChange, onBlur, value}}) => (
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.countryCode}>+91</Text>
                  <View style={styles.separator} />
                </View>
                <TextInput
                  placeholder="XXXXXXXXXX"
                  placeholderTextColor={theme.colors.textSecondary}
                  style={styles.phoneInput}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            )}
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <ButtonText variant="primary" onPress={handleSubmit(continueHandler)}>
            Continue
          </ButtonText>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
  contentContainer: {
    rowGap: '13@vs',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white', // Optional: Adds a dark overlay for text readability
    borderRadius: 20,
    alignItems: 'flex-start',
    paddingTop: 32,
    paddingHorizontal: 24,
    height: '375@vs',
  },

  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    width: '100%',
    height: verticalScale(48),
    borderColor: theme.colors.textSecondary,
    borderRadius: 20,
    paddingLeft: scale(18),
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  countryCode: {
    color: theme.colors.highlight,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: 'black',
  },
  phoneInput: {
    flex: 1,
    fontWeight: '600',
    paddingVertical: 0,
    fontSize: moderateScale(15.2),
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: scale(18),
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 20,
    width: 220,
    alignSelf: 'center',
  },
});

export default Signup;

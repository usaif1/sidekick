import React, {useState} from 'react';
import {View, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScaledSheet} from 'react-native-size-matters';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';

// store
import {useThemeStore} from '@/globalStore';
import userStore from '../store';

// components
import ButtonText from '@/components/ButtonText';
import CustomFormInput from '@/components/Input/CustomFormInput';
import {Divider} from '@/components';

// Define validation schema with Zod
const profileSchema = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  email: z.string().email({message: 'Invalid email address'}),
  phone: z.string().min(10, {message: 'Phone number must be at least 10 digits'}),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileProps {
  route?: {
    params?: {
      initialName?: string;
      initialEmail?: string;
      initialPhone?: string;
    };
  };
}

const EditProfile: React.FC<EditProfileProps> = ({route}) => {
  const navigation = useNavigation();
  const {colors} = useThemeStore(state => state.theme);
  
  // Get user profile and update function from store
  const profile = userStore.use.profile();
  const updateProfile = userStore.use.updateProfile();

  // Initialize form with React Hook Form + Zod
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: route?.params?.initialName || profile.name || '',
      email: route?.params?.initialEmail || profile.email || '',
      phone: route?.params?.initialPhone || profile.phone || '',
    },
  });

  // Handle save changes
  const onSubmit = (data: ProfileFormData) => {
    // Save changes to store and navigate back
    updateProfile({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.white}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Form container */}
          <View style={styles.formContainer}>
            {/* Name input */}
            <CustomFormInput
              name="name"
              label="Name"
              control={control}
              errors={errors}
              placeholder="Enter your name"
              required
              inputType="text"
              containerStyle={styles.inputContainer}
            />

            {/* Email input */}
            <CustomFormInput
              name="email"
              label="Email Address"
              control={control}
              errors={errors}
              placeholder="Enter your email"
              required
              inputType="email"
              containerStyle={styles.inputContainer}
            />

            {/* Phone input */}
            <CustomFormInput
              name="phone"
              label="Phone"
              control={control}
              errors={errors}
              placeholder="Enter your phone number"
              required
              variant="phone"
              countryCode="+91"
              inputType="numeric"
              containerStyle={styles.inputContainer}
            />
          </View>

          {/* Save Changes button */}
          <View style={styles.buttonContainer}>
            <ButtonText 
              variant="primary" 
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </ButtonText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    margin: '16@s',
    padding: '16@s',
    flexDirection: 'column',
    gap: '8@s',
  },
  inputContainer: {
    marginBottom: '16@s',
  },
  buttonContainer: {
    paddingHorizontal: '96@s',
    marginTop: 'auto', // Push to bottom
    marginBottom: '20@s',
  },
});

export default EditProfile;

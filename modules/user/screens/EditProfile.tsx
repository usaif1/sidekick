import React, {useState} from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScaledSheet} from 'react-native-size-matters';

// store
import {useThemeStore} from '@/globalStore';
import userStore from '../store';

// components
import {BaseInput, PhoneInput} from '@/components/Input';
import ButtonText from '@/components/ButtonText';

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

  // Initialize form state with route params or store data
  const [name, setName] = useState(route?.params?.initialName || profile.name);
  const [email, setEmail] = useState(route?.params?.initialEmail || profile.email);
  const [phone, setPhone] = useState(route?.params?.initialPhone || profile.phone);

  // Form validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Handle save changes
  const handleSaveChanges = () => {
    // Reset errors
    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    // Validate form
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Save changes to store and navigate back
      updateProfile({
        name,
        email,
        phone,
      });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Form container with blue border */}
      <View style={[styles.formContainer]}>
        {/* Name input */}
        <BaseInput
          title="Name"
          placeholder="XXXXXXXXXX"
          placeholderTextColor={colors.textSecondary}
          value={name}
          onChangeText={setName}
          error={errors.name}
          required
          inputType="text"
          testID="name-input"
          containerStyle={styles.inputContainer}
        />

        {/* Email input */}
        <BaseInput
          title="Email Address"
          placeholder="XXXXXXXXXX"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          required
          inputType="email"
          testID="email-input"
          containerStyle={styles.inputContainer}
        />

        {/* Phone input */}
        <PhoneInput
          title="Phone"
          placeholder="XXXXXXXXXX"
          placeholderTextColor={colors.textSecondary}
          value={phone}
          onChangeText={setPhone}
          error={errors.phone}
          required
          countryCode="+91"
          testID="phone-input"
          containerStyle={styles.inputContainer}
        />
      </View>

      {/* Save Changes button */}
      <View style={styles.buttonContainer}>
        <ButtonText variant="primary" onPress={handleSaveChanges}>
          Save Changes
        </ButtonText>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? '25@vs' : 0,
  },
  formContainer: {
    margin: 16,
    padding: 16,
    flexDirection: 'column',
    gap: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 96,
    marginTop: 'auto', // Push to bottom
    marginBottom: 20,
  },
});

export default EditProfile;

import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '@/components/Input';
import ButtonText from '@/components/ButtonText';
import {useThemeStore} from '@/globalStore';
import {Heading} from '@/components/Typography';

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
  const {colors, spacing} = useThemeStore(state => state.theme);

  // Initialize form state with route params or defaults
  const [name, setName] = useState(route?.params?.initialName || '');
  const [email, setEmail] = useState(route?.params?.initialEmail || '');
  const [phone, setPhone] = useState(route?.params?.initialPhone || '');

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
      // Save changes and navigate back
      console.log('Saving profile changes:', {name, email, phone});
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button">
          <Icon name="chevron-left" size={24} color={colors.highlight} />
        </TouchableOpacity>
        <Heading style={styles.headerTitle}>Edit Profile</Heading>
      </View>

      {/* Form container with blue border */}
      <View style={[styles.formContainer]}>
        {/* Name input */}
        <Input
          title="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          error={errors.name}
          required
          inputType="text"
          testID="name-input"
          containerStyle={styles.inputContainer}
        />

        {/* Email input */}
        <Input
          title="Email Address"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          required
          inputType="email"
          testID="email-input"
          containerStyle={styles.inputContainer}
        />

        {/* Phone input */}
        <Input
          title="Phone"
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          error={errors.phone}
          required
          variant="phone"
          countryCode="+91"
          inputType="numeric"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
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

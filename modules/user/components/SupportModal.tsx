import React from 'react';
import { View, Text, StyleSheet, Linking, Platform } from 'react-native';
import { useThemeStore } from '@/globalStore';
import CommonModal from '@/components/Modal/CommonModal';
import ButtonText from '@/components/ButtonText';
import Icon from 'react-native-vector-icons/Feather';

interface SupportModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  /**
   * Function to call when the modal is closed
   */
  onClose: () => void;
  /**
   * Support email address
   */
  supportEmail?: string;
  /**
   * Email subject
   */
  emailSubject?: string;
  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Modal for contacting support via email
 */
const SupportModal: React.FC<SupportModalProps> = ({
  visible,
  onClose,
  supportEmail = 'support@example.com',
  emailSubject = 'Support Request',
  testID = 'support-modal',
}) => {
  const { colors, spacing, typography } = useThemeStore(state => state.theme);

  const handleContactSupport = () => {
    // Create email URL with subject and recipient
    const emailUrl = Platform.select({
      ios: `mailto:${supportEmail}?subject=${encodeURIComponent(emailSubject)}`,
      android: `mailto:${supportEmail}?subject=${encodeURIComponent(emailSubject)}`,
      default: `mailto:${supportEmail}?subject=${encodeURIComponent(emailSubject)}`,
    });

    // Open email client
    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(emailUrl);
        }
        console.log('Cannot open email client');
      })
      .catch((error) => console.error('Error opening email client:', error));
  };

  return (
    <CommonModal
      visible={visible}
      onClose={onClose}
      testID={testID}
    >
      <View style={styles.container}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: colors.primary[100] }]}>
          <Icon name="mail" size={32} color={colors.primary[500]} />
        </View>
        
        {/* Title */}
        <Text 
          style={[
            styles.title, 
            { 
              color: colors.neutral[900],
              fontSize: typography.fontSize.lg,
            }
          ]}
        >
          Sorry for the inconvenience
        </Text>
        
        {/* Message */}
        <Text 
          style={[
            styles.message, 
            { 
              color: colors.neutral[600],
              fontSize: typography.fontSize.sm,
            }
          ]}
        >
          Please drop us an email and we'll get back to you
        </Text>
        
        {/* Button */}
        <ButtonText
          variant="primary"
          onPress={handleContactSupport}
        >
          Contact Support
        </ButtonText>
      </View>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default SupportModal; 
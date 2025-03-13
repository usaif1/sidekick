// dependencies
import React from 'react';
import {View, StyleSheet, Linking} from 'react-native';

// components
import CommonModal from '@/components/Modal/CommonModal';
import {H2, P2, Divider, ButtonText} from '@/components';

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
  const handleContactSupport = async () => {
    const emailUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(
      emailSubject,
    )}`;

    try {
      const supported = await Linking.canOpenURL(emailUrl);
      if (supported) {
        await Linking.openURL(emailUrl);
      } else {
        console.log('Cannot open email client');
      }
    } catch (error) {
      console.error('Error opening email client:', error);
    }
  };

  return (
    <CommonModal visible={visible} onClose={onClose} testID={testID}>
      <View style={styles.container}>
        {/* Title */}
        <H2>Sorry for the inconvenience !</H2>

        {/* Message */}
        <Divider height={5} />
        <P2 textColor="textSecondary">
          Please drop us an email and we'll get back to you
        </P2>

        {/* Button */}
        <Divider height={16} />
        <ButtonText variant="primary" onPress={handleContactSupport}>
          Drop an Email
        </ButtonText>
      </View>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 24,
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

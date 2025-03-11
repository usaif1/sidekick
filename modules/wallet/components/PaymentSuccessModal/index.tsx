import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useThemeStore } from '@/globalStore';
import ButtonText from '@/components/ButtonText';
import CommonModal from '@/components/Modal/CommonModal';

interface PaymentSuccessModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  /**
   * Function to call when the modal is closed
   */
  onClose: () => void;
  /**
   * Amount added to wallet
   */
  amount: number;
  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Modal displayed after successful payment
 */
const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  onClose,
  amount,
  testID = 'payment-success-modal',
}) => {
  const navigation = useNavigation();
  const { colors, typography } = useThemeStore(state => state.theme);
  
  // Handle continue to ride
  const handleContinueToRide = () => {
    // Navigate to home screen and close modal
    onClose();
    // navigation.navigate('rent', { screen: 'RentScreen' });
  };
  
  // Handle check wallet
  const handleCheckWallet = () => {
    // Close modal (already in wallet)
    onClose();
  };

  return (
    <CommonModal visible={visible} onClose={onClose} testID={testID}>
      <View style={styles.container}>
        {/* Success icon */}
        <View 
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primary[500] }
          ]}
        >
          <Icon name="check" size={32} color={colors.white} />
        </View>
        
        {/* Success message */}
        <Text 
          style={[
            styles.amountText,
            {
              color: colors.textPrimary,
              fontSize: typography.skP2.fontSize,
            }
          ]}
        >
          ₹{amount.toFixed(1)} Added to Wallet
        </Text>
        
        <Text 
          style={[
            styles.messageText,
            {
              color: colors.textSecondary,
              fontSize: typography.skP1.fontSize,
            }
          ]}
        >
          Please pick any option to continue
        </Text>
        
        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <ButtonText
            variant="primary"
            onPress={handleContinueToRide}
          >
            Continue to Ride
          </ButtonText>
        </View>
        
        <View style={[styles.buttonContainer, styles.secondaryButtonContainer]}>
          <ButtonText
            variant="secondary"
            onPress={handleCheckWallet}
          >
            Check Wallet
          </ButtonText>
        </View>
      </View>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountText: {
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  messageText: {
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 12,
  },
  secondaryButtonContainer: {
    marginBottom: 0,
  },
});

export default PaymentSuccessModal; 
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  /**
   * Optional callback for "Continue to Ride" action
   */
  onContinueToRide?: () => void;
  /**
   * Optional callback for "Check Wallet" action
   */
  onCheckWallet?: () => void;
}

/**
 * Modal displayed after successful payment
 */
const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  visible,
  onClose,
  amount,
  testID = 'payment-success-modal',
  onContinueToRide,
  onCheckWallet,
}) => {
  const { colors, typography } = useThemeStore(state => state.theme);
  
  // Handle continue to ride
  const handleContinueToRide = () => {
    // Close modal first
    onClose();
    // Call the callback if provided
    if (onContinueToRide) {
      onContinueToRide();
    }
  };
  
  // Handle check wallet
  const handleCheckWallet = () => {
    // Close modal
    onClose();
    // Call the callback if provided
    if (onCheckWallet) {
      onCheckWallet();
    }
  };

  const handleAddFunds = () => {
    console.log('Attempting to navigate to AddFundsScreen');
    // @ts-ignore
    navigation.navigate('wallet', {screen: 'AddFundsScreen'});
    console.log('Navigation command executed');
  };

  return (
    <CommonModal visible={visible} onClose={onClose} testID={testID}>
      <View style={styles.container}>
        {/* Success icon */}
        <View 
          style={[
            styles.iconContainer,
            { backgroundColor: colors.highlight }
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
              fontSize: typography.skH2.fontSize,
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
              fontSize: typography.skP3.fontSize,
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
        
        <View style={styles.buttonContainer}>
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
  amountText: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  messageText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 12,
  },
});

export default PaymentSuccessModal; 
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useThemeStore } from '@/globalStore';
import ButtonText from '@/components/ButtonText';
import CommonModal from '@/components/Modal/CommonModal';
import { H2, P3 } from '@/components/Typography';

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
  const { theme } = useThemeStore();
  
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
      <View style={styles.container(theme)}>
        {/* Success icon */}
        <View 
          style={[
            styles.iconContainer(theme),
            { backgroundColor: theme.colors.highlight }
          ]}
        >
          <Icon name="check" size={32} color={theme.colors.white} />
        </View>
        
        {/* Success message */}
        <H2 
          textColor="textPrimary"
          customStyles={styles.amountText(theme)}
        >
          ₹{amount.toFixed(1)} Added to Wallet
        </H2>
        
        <P3 
          textColor="textSecondary"
          customStyles={styles.messageText(theme)}
        >
          Please pick any option to continue
        </P3>
        
        {/* Action buttons */}
        <View style={styles.buttonContainer(theme)}>
          <ButtonText
            variant="primary"
            onPress={handleContinueToRide}
          >
            Continue to Ride
          </ButtonText>
        </View>
        
        <View style={styles.buttonContainer(theme)}>
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

const styles = {
  container: (theme: any) => ({
    alignItems: 'center' as const,
    paddingTop: theme.padding.vertical.lg_24,
  }),
  iconContainer: (theme: any) => ({
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: theme.margin.vertical.md_16,
  }),
  amountText: (theme: any) => ({
    fontWeight: '600',
    textAlign: 'center' as const,
    marginBottom: theme.margin.vertical.sm_8,
  }),
  messageText: (theme: any) => ({
    textAlign: 'center' as const,
    marginBottom: theme.margin.vertical.lg_24,
  }),
  buttonContainer: (theme: any) => ({
    width: '100%',
    marginBottom: theme.margin.vertical.sm_8,
  }),
};

export default PaymentSuccessModal; 
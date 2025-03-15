import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useThemeStore} from '@/globalStore';
import ButtonText from '@/components/ButtonText';
import CommonModal from '@/components/Modal/CommonModal';
import {Divider, H2, P2} from '@/components';
import TickMark from '@/assets/tick-mark.svg';

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
  const {colors, typography} = useThemeStore(state => state.theme);

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
          style={[styles.iconContainer, {backgroundColor: colors.highlight}]}>
          <TickMark />
        </View>

        {/* Success message */}
        <Divider height={16} />
        <H2>₹{amount.toFixed(1)} Added to Wallet</H2>
        <Divider height={3.2} />
        <P2 textColor="textSecondary">Please pick any option to continue</P2>

        {/* Action buttons */}
        <Divider height={16} />
        <View style={styles.buttonContainer}>
          <ButtonText variant="primary" onPress={handleContinueToRide}>
            Continue to Ride
          </ButtonText>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonText variant="secondary" onPress={handleCheckWallet}>
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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useGlobalStore, useThemeStore} from '@/globalStore';
import ButtonText from '@/components/ButtonText';
import {Divider, H2, P2} from '@/components';
import TickMark from '@/assets/tick-mark-curly.svg';

const WithdrawalConfirmationModal = () => {
  const {closeModal} = useGlobalStore();
  const {
    theme: {colors},
  } = useThemeStore();

  // Handle close modal
  const handleClose = () => {
    closeModal();
  };

  return (
    <View style={styles.container}>
      {/* Success icon */}
      <View style={[styles.iconContainer, {backgroundColor: colors.highlight}]}>
        <TickMark />
      </View>

      {/* Confirmation message */}
      <Divider height={16} />
      <H2 customStyles={{textAlign: 'center'}}>Withdrawal Request Received</H2>
      <Divider height={8} />
      <P2 textColor="textSecondary" customStyles={{textAlign: 'center'}}>
        Your withdrawal request has been received.
      </P2>
      <P2 textColor="textSecondary" customStyles={{textAlign: 'center'}}>
        Your security deposit will be refunded in 5-7 days.
      </P2>

      {/* Action button */}
      <Divider height={24} />
      <View style={styles.buttonContainer}>
        <ButtonText variant="highlight" onPress={handleClose}>
          OK
        </ButtonText>
      </View>
    </View>
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
  },
  buttonContainer: {
    width: 280,
  },
});

export default WithdrawalConfirmationModal; 
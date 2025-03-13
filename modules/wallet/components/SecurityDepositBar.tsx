import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useThemeStore} from '@/globalStore';
import ButtonText from '@/components/ButtonText';

interface SecurityDepositBarProps {
  /**
   * Security deposit amount
   */
  depositAmount: number;
  /**
   * Function to call when withdraw button is pressed
   */
  onWithdraw: () => void;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

/**
 * Bar displaying security deposit and withdraw button
 */
const SecurityDepositBar: React.FC<SecurityDepositBarProps> = ({
  depositAmount,
  onWithdraw,
  testID = 'security-deposit-bar',
}) => {
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: colors.lightGray,
        },
      ]}
      testID={testID}>
      <View
        style={[styles.depositContainer, {backgroundColor: colors.lightGray}]}>
        <Text
          style={[
            styles.label,
            {
              color: colors.textPrimary,
              fontSize: typography.skP2.fontSize,
            },
          ]}>
          Security Deposit
        </Text>
        <Text
          style={[
            styles.amount,
            {
              color: colors.textPrimary,
              fontSize: typography.skP2.fontSize,
            },
          ]}>
          ₹{depositAmount}
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <ButtonText variant="highlight" onPress={onWithdraw}>
          Withdraw
        </ButtonText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  depositContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '65%',
    padding: 10,
    borderRadius: 16,
  },
  label: {
    marginRight: 8,
  },
  amount: {
    fontWeight: '600',
  },
  buttonWrapper: {
    width: 120, // Adjust width as needed
  },
});

export default SecurityDepositBar;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeStore } from '@/globalStore';

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
  const { colors, spacing, borderRadius, typography } = useThemeStore(state => state.theme);

  return (
    <View 
      style={[
        styles.container,
        {
          borderBottomColor: colors.neutral[200],
        }
      ]}
      testID={testID}
    >
      <View style={styles.depositContainer}>
        <Text 
          style={[
            styles.label,
            {
              color: colors.neutral[700],
              fontSize: typography.fontSize.sm,
            }
          ]}
        >
          Security Deposit
        </Text>
        <Text 
          style={[
            styles.amount,
            {
              color: colors.neutral[900],
              fontSize: typography.fontSize.base,
            }
          ]}
        >
          ₹{depositAmount}
        </Text>
      </View>
      
      <TouchableOpacity
        style={[
          styles.withdrawButton,
          {
            backgroundColor: colors.primary[500],
            borderRadius: borderRadius.full,
          }
        ]}
        onPress={onWithdraw}
        accessibilityLabel="Withdraw security deposit"
        accessibilityRole="button"
        testID={`${testID}-withdraw-button`}
      >
        <Text 
          style={[
            styles.buttonText,
            {
              color: colors.neutral[0],
              fontSize: typography.fontSize.sm,
            }
          ]}
        >
          Withdraw
        </Text>
      </TouchableOpacity>
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
  },
  label: {
    marginRight: 8,
  },
  amount: {
    fontWeight: '600',
  },
  withdrawButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: '600',
  },
});

export default SecurityDepositBar; 
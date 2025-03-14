import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useThemeStore} from '@/globalStore';
import ButtonText from '@/components/ButtonText';
import {P2} from '@/components/Typography';

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
  const {theme} = useThemeStore();

  return (
    <View
      style={[
        styles.container(theme),
        {
          borderBottomColor: theme.colors.lightGray,
        },
      ]}
      testID={testID}>
      <View
        style={[
          styles.depositContainer(theme), 
          {backgroundColor: theme.colors.lightGray}
        ]}>
        <P2 
          textColor="textPrimary"
          customStyles={styles.label(theme)}
        >
          Security Deposit
        </P2>
        <P2 
          textColor="textPrimary"
          weight="600"
        >
          ₹{depositAmount}
        </P2>
      </View>

      <View style={styles.buttonWrapper}>
        <ButtonText customStyles={styles.button(theme)} variant="highlight" onPress={onWithdraw}>
          Withdraw
        </ButtonText>
      </View>
    </View>
  );
};

const styles = {
  container: (theme: any) => ({
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: theme.padding.vertical.md_16,
    paddingHorizontal: theme.padding.horizontal.md_16,
    borderBottomWidth: 1,
  }),
  depositContainer: (theme: any) => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    width: '60%',
    padding: theme.padding.horizontal.sm_8,
    borderRadius: theme.borderRadius.lg,
  }),
  label: (theme: any) => ({
    marginRight: theme.margin.horizontal.sm_8,
  }),
  buttonWrapper: {
    width: 120,
  },
  button: (theme: any) => ({
    width: 120,
    height: 10,
  }),
};

export default SecurityDepositBar;

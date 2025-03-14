import React from 'react';
import { View } from 'react-native';
import { useThemeStore } from '@/globalStore';
import { P2, H1 } from '@/components/Typography';

interface WalletCardProps {
  /**
   * Current wallet balance
   */
  balance: number;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

/**
 * Card displaying the current wallet balance
 */
const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  testID = 'wallet-card',
}) => {
  const { theme } = useThemeStore();

  return (
    <View 
      style={[
        styles.container(theme),
        {
          borderColor: theme.colors.highlight,
          backgroundColor: theme.colors.lightGray,
        }
      ]}
      testID={testID}
    >
      <P2 
        textColor="textSecondary"
        weight="500"
      >
        Current Balance
      </P2>
      <H1 
        textColor="textPrimary"
        customStyles={styles.balance}
      >
        ₹{balance.toFixed(1)}
      </H1>
      
      {/* Diagonal pattern background - commented out in original */}
      {/* <View style={styles.patternContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.diagonalLine(theme),
              {
                backgroundColor: theme.colors.highlight,
                top: index * 10,
              }
            ]} 
          />
        ))}
        {Array.from({ length: 10 }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.diagonalLineReverse(theme),
              {
                backgroundColor: theme.colors.highlight,
                top: index * 10,
              }
            ]} 
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = {
  container: (theme: any) => ({
    padding: theme.padding.horizontal.md_20,
    width: '100%',
    overflow: 'hidden' as const,
    position: 'relative' as const,
    borderWidth: 1,
    borderRadius: theme.borderRadius.xl,
    height: '30%',
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  }),
  balance: {
    fontWeight: '900',
  },
  patternContainer: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    overflow: 'hidden' as const,
    zIndex: -1,
  },
  diagonalLine: (theme: any) => ({
    position: 'absolute' as const,
    height: 1,
    width: '200%',
    top: 50,
    left: 50,
    transform: [{ rotate: '-10deg' }],
    opacity: 0.5,
  }),
  diagonalLineReverse: (theme: any) => ({
    position: 'absolute' as const,
    height: 1,
    top: 50,
    width: '200%',
    right: 50,
    transform: [{ rotate: '10deg' }],
    opacity: 0.5,
  }),
};

export default WalletCard; 
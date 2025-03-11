import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/globalStore';

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
  const { colors, spacing, 
    // borderRadius,
     typography, shadows } = useThemeStore(state => state.theme);

  return (
    <View 
      style={[
        styles.container,
        {
          // borderRadius: borderRadius.lg,
          ...shadows.md,
        }
      ]}
      testID={testID}
    >
      <Text 
        style={[
          styles.label,
          {
            color: colors.textPrimary,
            fontSize: typography.skP1.fontSize,
          }
        ]}
      >
        Current Balance
      </Text>
      <Text 
        style={[
          styles.balance,
          {
            color: colors.textPrimary,
            fontSize: typography.skP2.fontSize,
          }
        ]}
      >
        ₹{balance.toFixed(1)}
      </Text>
      
      {/* Diagonal pattern background */}
      <View style={styles.patternContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.diagonalLine,
              {
                backgroundColor: colors.primary[300],
                top: index * 15,
              }
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  balance: {
    fontWeight: '700',
  },
  patternContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    overflow: 'hidden',
    zIndex: -1,
  },
  diagonalLine: {
    position: 'absolute',
    height: 1,
    width: '200%',
    left: -50,
    transform: [{ rotate: '-10deg' }],
    opacity: 0.5,
  },
});

export default WalletCard; 
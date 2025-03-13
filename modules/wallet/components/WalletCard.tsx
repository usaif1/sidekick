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
          borderRadius: 20,
          borderColor: colors.highlight,
          backgroundColor: colors.lightGray,
        }
      ]}
      testID={testID}
    >
      <Text 
        style={[
          styles.label,
          {
            color: colors.textSecondary,
            fontSize: typography.skP2.fontSize,
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
            fontSize: typography.skH1.fontSize,
          }
        ]}
      >
        ₹{balance.toFixed(1)}
      </Text>
      
      {/* Diagonal pattern background */}
      {/* <View style={styles.patternContainer}>
        {Array.from({ length: 10 }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.diagonalLine,
              {
                backgroundColor: colors.highlight,
                top: index * 10,
              }
            ]} 
          />
        ))}
        {Array.from({ length: 10 }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.diagonalLineReverse,
              {
                backgroundColor: colors.highlight,
                top: index * 10,
              }
            ]} 
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: '500',
  },
  balance: {
    fontWeight: '900',
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
    top:50,
    left: 50,
    transform: [{ rotate: '-10deg' }],
    opacity: 0.5,
  },
  diagonalLineReverse: {
    position: 'absolute',
    height: 1,
    top:50,
    width: '200%',
    right: 50,
    transform: [{ rotate: '10deg' }],
    opacity: 0.5,
  },
});

export default WalletCard; 
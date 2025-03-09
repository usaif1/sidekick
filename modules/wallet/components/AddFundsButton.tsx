import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '@/globalStore';

interface AddFundsButtonProps {
  /**
   * Function to call when button is pressed
   */
  onPress: () => void;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

/**
 * Button for adding funds to wallet
 */
const AddFundsButton: React.FC<AddFundsButtonProps> = ({
  onPress,
  testID = 'add-funds-button',
}) => {
  const { colors, spacing, 
    // borderRadius,
     typography } = useThemeStore(state => state.theme);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.semantic.success,
          // borderRadius: borderRadius.full,
        }
      ]}
      onPress={onPress}
      accessibilityLabel="Add funds to wallet"
      accessibilityRole="button"
      testID={testID}
    >
      <Text 
        style={[
          styles.buttonText,
          {
            color: colors.neutral[200],
            fontSize: typography.fontSize.base,
          }
        ]}
      >
        Add Funds
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: '600',
  },
});

export default AddFundsButton; 
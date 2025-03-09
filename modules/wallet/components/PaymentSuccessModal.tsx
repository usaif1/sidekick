import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useThemeStore } from '@/globalStore';

interface RouteParams {
  amount: number;
}

const PaymentSuccessModal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors, spacing, borderRadius, typography } = useThemeStore(state => state.theme);
  
  // Get amount from route params
  const { amount = 0 } = route.params as RouteParams;
  
  // Handle continue to ride
  const handleContinueToRide = () => {
    // Navigate to home screen
    navigation.navigate('Home');
  };
  
  // Handle check wallet
  const handleCheckWallet = () => {
    // Navigate back to wallet screen
    navigation.navigate('WalletScreen');
  };

  return (
    <View 
      style={[
        styles.container,
        { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
      ]}
    >
      <View 
        style={[
          styles.modal,
          {
            backgroundColor: colors.neutral[0],
            borderRadius: borderRadius.lg,
          }
        ]}
      >
        {/* Close button */}
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="x" size={24} color={colors.neutral[600]} />
        </TouchableOpacity>
        
        {/* Success icon */}
        <View 
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primary[500] }
          ]}
        >
          <Icon name="check" size={32} color={colors.neutral[0]} />
        </View>
        
        {/* Success message */}
        <Text 
          style={[
            styles.amountText,
            {
              color: colors.neutral[900],
              fontSize: typography.fontSize.lg,
            }
          ]}
        >
          ₹{amount.toFixed(1)} Added to Wallet
        </Text>
        
        <Text 
          style={[
            styles.messageText,
            {
              color: colors.neutral[600],
              fontSize: typography.fontSize.sm,
            }
          ]}
        >
          Please pick any option to continue
        </Text>
        
        {/* Action buttons */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: colors.success[500],
              borderRadius: borderRadius.full,
            }
          ]}
          onPress={handleContinueToRide}
        >
          <Text 
            style={[
              styles.continueButtonText,
              {
                color: colors.neutral[0],
                fontSize: typography.fontSize.base,
              }
            ]}
          >
            Continue to Ride
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.checkWalletButton,
            {
              backgroundColor: colors.neutral[100],
              borderRadius: borderRadius.full,
            }
          ]}
          onPress={handleCheckWallet}
        >
          <Text 
            style={[
              styles.checkWalletButtonText,
              {
                color: colors.neutral[900],
                fontSize: typography.fontSize.base,
              }
            ]}
          >
            Check Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountText: {
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  messageText: {
    marginBottom: 24,
    textAlign: 'center',
  },
  continueButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    fontWeight: '600',
  },
  checkWalletButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkWalletButtonText: {
    fontWeight: '600',
  },
});

export default PaymentSuccessModal; 
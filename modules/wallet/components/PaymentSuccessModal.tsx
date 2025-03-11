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
            borderRadius: borderRadius.lg,
          }
        ]}
      >
        {/* Close button */}
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="x" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        {/* Success icon */}
        <View 
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primary[500] }
          ]}
        >
          <Icon name="check" size={32} color={colors.white} />
        </View>
        
        {/* Success message */}
        <Text 
          style={[
            styles.amountText,
            {
              color: colors.textPrimary,
              fontSize: typography.skP2.fontSize,
            }
          ]}
        >
          ₹{amount.toFixed(1)} Added to Wallet
        </Text>
        
        <Text 
          style={[
            styles.messageText,
            {
              color: colors.textSecondary,
              fontSize: typography.skP1.fontSize,
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
              backgroundColor: colors.primary,
              borderRadius: borderRadius.full,
            }
          ]}
          onPress={handleContinueToRide}
        >
          <Text 
            style={[
              styles.continueButtonText,
              {
                color: colors.white,
                fontSize: typography.skP2.fontSize,
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
              backgroundColor: colors.lightGray,
              borderRadius: borderRadius.full,
            }
          ]}
          onPress={handleCheckWallet}
        >
          <Text 
            style={[
              styles.checkWalletButtonText,
              {
                color: colors.textPrimary,
                fontSize: typography.skP2.fontSize,
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
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '@/components/Input';
import ButtonText from '@/components/ButtonText';
import { useThemeStore } from '@/globalStore';

// Payment method type
type PaymentMethod = 'upi' | 'card' | 'netbanking';

// Quick amount options
const QUICK_AMOUNTS = [100, 200, 500, 1000];

const AddFundsScreen = () => {
  const navigation = useNavigation();
  const { colors, spacing, borderRadius, typography, shadows } = useThemeStore(state => state.theme);
  
  // State for amount and payment method
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  
  // Handle quick amount selection
  const handleQuickAmountSelect = (value: number) => {
    setAmount(value.toString());
  };
  
  // Handle payment method selection
  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };
  
  // Handle pay button press
  const handlePay = () => {
    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      // Show error
      return;
    }
    
    // Navigate to payment success modal
    navigation.navigate('PaymentSuccessModal', {
      amount: parseFloat(amount)
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Icon name="chevron-left" size={24} color={colors.primary[500]} />
        </TouchableOpacity>
        <Text 
          style={[
            styles.headerTitle,
            { 
              color: colors.neutral[900],
              fontSize: typography.fontSize.lg,
            }
          ]}
        >
          Add Funds
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Amount input section */}
        <View style={styles.section}>
          <Text 
            style={[
              styles.sectionTitle,
              { 
                color: colors.neutral[700],
                fontSize: typography.fontSize.base,
              }
            ]}
          >
            Enter Amount
          </Text>
          
          <Input
            title="Amount (₹)"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            inputType="numeric"
            testID="amount-input"
            containerStyle={styles.amountInput}
          />
          
          {/* Quick amount options */}
          <View style={styles.quickAmounts}>
            {QUICK_AMOUNTS.map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.quickAmountButton,
                  {
                    backgroundColor: amount === value.toString() ? colors.primary[100] : colors.neutral[100],
                    borderColor: amount === value.toString() ? colors.primary[500] : colors.neutral[300],
                    borderRadius: borderRadius.md,
                  }
                ]}
                onPress={() => handleQuickAmountSelect(value)}
              >
                <Text 
                  style={[
                    styles.quickAmountText,
                    { 
                      color: amount === value.toString() ? colors.primary[700] : colors.neutral[700],
                    }
                  ]}
                >
                  ₹{value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Payment methods section */}
        <View style={styles.section}>
          <Text 
            style={[
              styles.sectionTitle,
              { 
                color: colors.neutral[700],
                fontSize: typography.fontSize.base,
              }
            ]}
          >
            Payment Method
          </Text>
          
          {/* UPI option */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              {
                backgroundColor: selectedMethod === 'upi' ? colors.primary[100] : colors.neutral[0],
                borderColor: selectedMethod === 'upi' ? colors.primary[500] : colors.neutral[300],
                borderRadius: borderRadius.md,
              }
            ]}
            onPress={() => handleMethodSelect('upi')}
          >
            <View style={styles.paymentOptionContent}>
              <Icon name="smartphone" size={20} color={colors.primary[500]} />
              <Text 
                style={[
                  styles.paymentOptionText,
                  { 
                    color: colors.neutral[900],
                    marginLeft: spacing.sm,
                  }
                ]}
              >
                UPI
              </Text>
            </View>
            {selectedMethod === 'upi' && (
              <Icon name="check-circle" size={20} color={colors.primary[500]} />
            )}
          </TouchableOpacity>
          
          {/* Card option */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              {
                backgroundColor: selectedMethod === 'card' ? colors.primary[100] : colors.neutral[0],
                borderColor: selectedMethod === 'card' ? colors.primary[500] : colors.neutral[300],
                borderRadius: borderRadius.md,
              }
            ]}
            onPress={() => handleMethodSelect('card')}
          >
            <View style={styles.paymentOptionContent}>
              <Icon name="credit-card" size={20} color={colors.primary[500]} />
              <Text 
                style={[
                  styles.paymentOptionText,
                  { 
                    color: colors.neutral[900],
                    marginLeft: spacing.sm,
                  }
                ]}
              >
                Credit/Debit Card
              </Text>
            </View>
            {selectedMethod === 'card' && (
              <Icon name="check-circle" size={20} color={colors.primary[500]} />
            )}
          </TouchableOpacity>
          
          {/* Net Banking option */}
          <TouchableOpacity
            style={[
              styles.paymentOption,
              {
                backgroundColor: selectedMethod === 'netbanking' ? colors.primary[100] : colors.neutral[0],
                borderColor: selectedMethod === 'netbanking' ? colors.primary[500] : colors.neutral[300],
                borderRadius: borderRadius.md,
              }
            ]}
            onPress={() => handleMethodSelect('netbanking')}
          >
            <View style={styles.paymentOptionContent}>
              <Icon name="globe" size={20} color={colors.primary[500]} />
              <Text 
                style={[
                  styles.paymentOptionText,
                  { 
                    color: colors.neutral[900],
                    marginLeft: spacing.sm,
                  }
                ]}
              >
                Net Banking
              </Text>
            </View>
            {selectedMethod === 'netbanking' && (
              <Icon name="check-circle" size={20} color={colors.primary[500]} />
            )}
          </TouchableOpacity>
        </View>
        
        {/* Summary section */}
        <View 
          style={[
            styles.summarySection,
            {
              backgroundColor: colors.neutral[50],
              borderRadius: borderRadius.md,
            }
          ]}
        >
          <View style={styles.summaryRow}>
            <Text style={{ color: colors.neutral[700] }}>Amount</Text>
            <Text style={{ color: colors.neutral[900], fontWeight: '600' }}>
              ₹{amount || '0'}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={{ color: colors.neutral[700] }}>Security Deposit</Text>
            <Text style={{ color: colors.neutral[900], fontWeight: '600' }}>₹200</Text>
          </View>
          
          <View 
            style={[
              styles.summaryDivider,
              { backgroundColor: colors.neutral[300] }
            ]} 
          />
          
          <View style={styles.summaryRow}>
            <Text style={{ color: colors.neutral[900], fontWeight: '600' }}>Total</Text>
            <Text style={{ color: colors.neutral[900], fontWeight: '700' }}>
              ₹{(parseFloat(amount || '0') + 200).toFixed(1)}
            </Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Pay button */}
      <View style={styles.buttonContainer}>
        <ButtonText 
          variant="primary" 
          onPress={handlePay}
        >
          Pay Now
        </ButtonText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    marginRight: 40, // To offset the back button and center the title
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  amountInput: {
    marginBottom: 16,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  quickAmountButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
  },
  quickAmountText: {
    fontWeight: '500',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  paymentOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontWeight: '500',
  },
  summarySection: {
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryDivider: {
    height: 1,
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});

export default AddFundsScreen; 
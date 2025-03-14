import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ButtonText from '@/components/ButtonText';
import {useThemeStore} from '@/globalStore';
import {useModal} from '@/components/Modal/ModalProvider';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
import {B1, B2, Divider} from '@/components';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {TextInput} from 'react-native-gesture-handler';

const {colors} = useThemeStore.getState().theme;

// Quick amount options
const QUICK_AMOUNTS = [100, 200, 500, 1000];

const AddFundsScreen = () => {
  const navigation = useNavigation();
  const {showModal, hideModal} = useModal();

  // State for amount and payment method
  const [amount, setAmount] = useState('');

  // Handle quick amount selection
  const handleQuickAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  // Handle pay button press
  const handlePay = () => {
    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      // Show error
      return;
    }

    // Show payment success modal with navigation callbacks
    showModal(
      <PaymentSuccessModal
        visible={true}
        onClose={hideModal}
        amount={parseFloat(amount)}
        testID="payment-success-modal"
        onContinueToRide={() => navigation.navigate('home')}
        onCheckWallet={() => {
          // Already in wallet, so no navigation needed
          // Or you could navigate to a specific wallet tab if needed
        }}
      />,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Amount input section */}
        <View style={styles.section}>
          <View>
            <B2 textColor="highlight">Available Balance: ₹56.0</B2>
            <Divider height={9.6} />
            <View style={styles.amountInput}>
              <B1 textColor="highlight">₹</B1>
              <TextInput
                numberOfLines={1}
                keyboardType="numeric"
                placeholder="00.0"
                value={amount}
                onChangeText={text => {
                  setAmount(text);
                }}
                placeholderTextColor={colors.textPrimary}
                style={{
                  width: '50%',
                  fontSize: ms(23),
                  textAlign: 'right',
                  fontWeight: '600',
                }}
              />
            </View>
          </View>

          {/* Quick amount options */}
          <Divider height={9.6} />
          <View style={styles.quickAmounts}>
            {QUICK_AMOUNTS.map(value => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.quickAmountButton,
                  {
                    backgroundColor:
                      amount === value.toString()
                        ? colors.highlight
                        : colors.lightGray,
                    borderColor:
                      amount === value.toString()
                        ? colors.highlight
                        : colors.textSecondary,
                  },
                ]}
                onPress={() => handleQuickAmountSelect(value)}>
                <Text
                  style={[
                    styles.quickAmountText,
                    {
                      color:
                        amount === value.toString()
                          ? colors.white
                          : colors.textPrimary,
                    },
                  ]}>
                  + {value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Pay button */}
      {amount && (
        <View style={styles.buttonContainer}>
          <ButtonText variant="primary" onPress={handlePay}>
            Pay ₹{(parseFloat(amount || '0') + 200).toFixed(2)}
          </ButtonText>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.textSecondary,
    padding: '19@ms',
    borderRadius: 20,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  quickAmountButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 12,
    width: '22%',
  },
  quickAmountText: {
    fontWeight: '500',
    textAlign: 'center',
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
    paddingHorizontal: 96,
  },
});

export default AddFundsScreen;

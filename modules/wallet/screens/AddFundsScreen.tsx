import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Input from '@/components/Input';
import ButtonText from '@/components/ButtonText';
import {useThemeStore} from '@/globalStore';
import {useModal} from '@/components/Modal/ModalProvider';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
import {H2, P1, P2} from '@/components/Typography';
import {SafeAreaView} from 'react-native-safe-area-context';

// Payment method type
type PaymentMethod = 'upi' | 'card' | 'netbanking';

// Quick amount options
const QUICK_AMOUNTS = [100, 200, 500, 1000];

const AddFundsScreen = () => {
  const navigation = useNavigation();
  const {theme} = useThemeStore();
  const {showModal, hideModal} = useModal();

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
      {/* Header with back button */}
      <View style={styles.header(theme)}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton(theme)}
          accessibilityLabel="Go back"
          accessibilityRole="button">
          <Icon name="chevron-left" size={24} color={theme.colors.highlight} />
        </TouchableOpacity>
        <H2 
          textColor="textPrimary"
          customStyles={styles.headerTitle(theme)}
        >
          Add Funds
        </H2>
      </View>

      <ScrollView style={styles.content(theme)}>
        {/* Amount input section */}
        <View style={styles.section(theme)}>
          <Input
            title="Available Balance ₹56.0"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            inputType="numeric"
            variant="currency"
            testID="amount-input"
            containerStyle={styles.amountInput(theme)}
          />

          {/* Quick amount options */}
          <View style={styles.quickAmounts}>
            {QUICK_AMOUNTS.map(value => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.quickAmountButton(theme),
                  {
                    backgroundColor:
                      amount === value.toString()
                        ? theme.colors.secondary
                        : theme.colors.lightGray,
                    borderColor:
                      amount === value.toString()
                        ? theme.colors.primary
                        : theme.colors.textSecondary,
                  },
                ]}
                onPress={() => handleQuickAmountSelect(value)}>
                <P2
                  textColor={amount === value.toString() ? "highlight" : "textPrimary"}
                  weight="500"
                  customStyles={styles.quickAmountText}
                >
                  + {value}
                </P2>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment methods section */}
        <View style={styles.section(theme)}>
          <P1
            textColor="textPrimary"
            weight="600"
            customStyles={styles.sectionTitle(theme)}
          >
            Payment Method
          </P1>

          {/* UPI option */}
          <TouchableOpacity
            style={[
              styles.paymentOption(theme),
              {
                borderColor:
                  selectedMethod === 'upi' ? theme.colors.primary : theme.colors.lightGray,
              },
            ]}
            onPress={() => handleMethodSelect('upi')}>
            <View style={styles.paymentOptionContent}>
              <Icon name="smartphone" size={20} color={theme.colors.highlight} />
              <P2
                textColor="textPrimary"
                weight="500"
                customStyles={{marginLeft: theme.spacing.sm}}
              >
                UPI
              </P2>
            </View>
            {selectedMethod === 'upi' && (
              <Icon name="check-circle" size={20} color={theme.colors.primary} />
            )}
          </TouchableOpacity>

          {/* Card option */}
          <TouchableOpacity
            style={[
              styles.paymentOption(theme),
              {
                borderColor:
                  selectedMethod === 'card' ? theme.colors.primary : theme.colors.lightGray,
              },
            ]}
            onPress={() => handleMethodSelect('card')}>
            <View style={styles.paymentOptionContent}>
              <Icon name="credit-card" size={20} color={theme.colors.highlight} />
              <P2
                textColor="textPrimary"
                weight="500"
                customStyles={{marginLeft: theme.spacing.sm}}
              >
                Credit/Debit Card
              </P2>
            </View>
            {selectedMethod === 'card' && (
              <Icon name="check-circle" size={20} color={theme.colors.primary} />
            )}
          </TouchableOpacity>

          {/* Net Banking option */}
          <TouchableOpacity
            style={[
              styles.paymentOption(theme),
              {
                borderColor:
                  selectedMethod === 'netbanking'
                    ? theme.colors.primary
                    : theme.colors.lightGray,
              },
            ]}
            onPress={() => handleMethodSelect('netbanking')}>
            <View style={styles.paymentOptionContent}>
              <Icon name="globe" size={20} color={theme.colors.highlight} />
              <P2
                textColor="textPrimary"
                weight="500"
                customStyles={{marginLeft: theme.spacing.sm}}
              >
                Net Banking
              </P2>
            </View>
            {selectedMethod === 'netbanking' && (
              <Icon name="check-circle" size={20} color={theme.colors.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Summary section */}
        <View
          style={[
            styles.summarySection(theme),
            {
              backgroundColor: theme.colors.lightGray,
              borderRadius: theme.borderRadius.lg,
            },
          ]}>
          <View style={styles.summaryRow(theme)}>
            <P2 textColor="textPrimary">Amount</P2>
            <P2 textColor="textPrimary" weight="600">
              ₹{amount || '0'}
            </P2>
          </View>

          <View style={styles.summaryRow(theme)}>
            <P2 textColor="textPrimary">Security Deposit</P2>
            <P2 textColor="textPrimary" weight="600">
              ₹200
            </P2>
          </View>

          <View
            style={[styles.summaryDivider(theme), {backgroundColor: theme.colors.lightGray}]}
          />

          <View style={styles.summaryRow(theme)}>
            <P2 textColor="textPrimary" weight="600">
              Total
            </P2>
            <P2 textColor="textPrimary" weight="700">
              ₹{(parseFloat(amount || '0') + 200).toFixed(1)}
            </P2>
          </View>
        </View>
      </ScrollView>

      {/* Pay button */}
      {amount && (
        <View style={styles.buttonContainer(theme)}>
          <ButtonText variant="primary" onPress={handlePay}>
            Pay ₹{(parseFloat(amount || '0') + 200).toFixed(2)}
          </ButtonText>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: (theme: any) => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: theme.padding.horizontal.md_16,
    paddingVertical: theme.padding.vertical.sm_8,
  }),
  backButton: (theme: any) => ({
    padding: theme.padding.horizontal.sm_8,
  }),
  headerTitle: (theme: any) => ({
    flex: 1,
    textAlign: 'left' as const,
    marginLeft: theme.margin.horizontal.md_16,
  }),
  content: (theme: any) => ({
    flex: 1,
    padding: theme.padding.horizontal.md_16,
  }),
  section: (theme: any) => ({
    marginBottom: theme.margin.vertical.lg_24,
  }),
  sectionTitle: (theme: any) => ({
    marginBottom: theme.margin.vertical.sm_8,
  }),
  amountInput: (theme: any) => ({
    marginBottom: theme.margin.vertical.md_16,
  }),
  quickAmounts: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    marginHorizontal: -4,
  },
  quickAmountButton: (theme: any) => ({
    paddingVertical: theme.padding.vertical.sm_8,
    paddingHorizontal: theme.padding.horizontal.md_16,
    margin: 4,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    width: '22%',
  }),
  quickAmountText: {
    textAlign: 'center' as const,
  },
  paymentOption: (theme: any) => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: theme.padding.horizontal.md_16,
    marginBottom: theme.margin.vertical.sm_8,
    borderWidth: 1,
  }),
  paymentOptionContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  summarySection: (theme: any) => ({
    padding: theme.padding.horizontal.md_16,
    marginBottom: theme.margin.vertical.lg_24,
  }),
  summaryRow: (theme: any) => ({
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: theme.margin.vertical.sm_8,
  }),
  summaryDivider: (theme: any) => ({
    height: 1,
    marginVertical: theme.margin.vertical.sm_8,
  }),
  buttonContainer: (theme: any) => ({
    padding: theme.padding.horizontal.md_16,
    paddingHorizontal: 96, // Keeping this specific value as it seems intentional for button width
  }),
};

export default AddFundsScreen;
